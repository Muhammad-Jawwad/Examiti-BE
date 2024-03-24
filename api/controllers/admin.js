const { validationResult } = require("express-validator");
const Department = require("../models/department");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

    //#region : AUTH

    login: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    message: "Validation error",
                    errors: errors.array()
                });
            }

            const { email, password } = req.body;

            const adminDetails = await Admin.findOne({
                email: email
            });

            if (!adminDetails) {
                return res.status(401).json({
                    code:401,
                    message: "Admin with this email not found",
                });
            }

            const isMatch = await bcrypt.compare(password, adminDetails.password);

            if (!isMatch) {
                return res.status(401).json({
                    code: 401,
                    message: "Invalid password",
                });
            }

            const token = jwt.sign(
                {
                    id: adminDetails._id.toString(),
                    email: adminDetails.email,
                    departmentId: adminDetails.departmentId,
                    expiration: Date.now() + 3600000,
                },
                process.env.JWT_SecretKey,
                { expiresIn: "1h" }
            );
            const adminData = {
                _id: adminDetails._id,
                name: adminDetails.name,
                email: adminDetails.email
            };
            res.status(200).json({
                code: 200,
                message: "Login successful",
                data: adminData,
                token: token,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    //#endregion

    //#region : ADMIN CRUD

    createAdmin: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    message: "Validation error",
                    errors: errors.array()
                });
            }

            // Check if user already exists with this email
            const existingUser = await Admin.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(409).json({
                    code: 409,
                    message: "Admin with this email already exists",
                });
            }

            const departmentId = req.body.departmentId;
            const isExistDepartment = await Department.findById(departmentId);
            if (!isExistDepartment) {
                return res.status(404).json({
                    code: 404,
                    message: "Department not found"
                });
            }

            //Password encription
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            //creating a new admin
            const newAdmin = new Admin({
                name: req.body.name,
                email: req.body.email,
                departmentId: req.body.departmentId,
                password: hashedPassword,
            });
            const AdminDetails = await newAdmin.save();

            // Returning success message
            res.status(201).json({
                code: 201,
                message: "New Admin created successfully",
                data: AdminDetails,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    getAllAdmins: async (req, res) => {
        try {
            const adminList = await Admin.find().sort({ _id: -1 });
            if (adminList.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "No Admin found"
                });
            }
            res.json({
                code: 200,
                message: "Admins retrieved successfully",
                data: adminList
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    getAdminById: async (req, res) => {
        try {
            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const foundAdmin = await Admin.findById(id);
            if (!foundAdmin) {
                return res.status(404).json({
                    code: 404,
                    message: "Admin not found",
                });
            }
            res.json({
                code: 200,
                message: "Admin retrieved successfully",
                data: foundAdmin
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    updateAdmin: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    message: "Validation error",
                    errors: errors.array()
                });
            }

            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const departmentId = req.body.departmentId;
            if (departmentId) {
                const isExistDepartment = await Department.findById(departmentId);
                if (!isExistDepartment) {
                    return res.status(404).json({
                        code: 404,
                        message: "Department not found"
                    });
                }
            }

            const updateFields = {};
            const fieldsToUpdate = ['name', 'departmentId'];
            fieldsToUpdate.forEach(field => {
                if (req.body[field]) {
                    updateFields[field] = req.body[field];
                }
            });

            const updatedAdmin = await Admin.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedAdmin) {
                return res.status(404).json({
                    code: 404,
                    message: "Admin not found",
                });
            }

            // Return the updated Admin
            res.status(200).json({
                code: 200,
                message: "Admin updated successfully",
                data: updatedAdmin,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    deleteAdmin: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedAdmin = await Admin.findByIdAndDelete(id);
            if (!deletedAdmin) {
                return res.status(404).json({
                    code: 404,
                    message: "Admin not found",
                });
            }

            res.status(200).json({
                code: 200,
                message: "Admin deleted successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    //#endregion

    //#region : OTHER APIs

    getAdminByDepartmentId: async (req, res) => {
        try {
            const id = req.params.departmentId; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const isExistDepartment = await Department.findById(id)
            if (!isExistDepartment) {
                return res.status(404).json({
                    code: 404,
                    message: "Department not found"
                });
            }

            const foundAdminByDepartment = await Admin.find({
                departmentId: id
            });
            if (foundAdminByDepartment.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "Admin not found",
                });
            }
            res.json({
                code: 200,
                message: "Admin by Department Id retrieved successfully",
                data: foundAdminByDepartment
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    //#endregion

}