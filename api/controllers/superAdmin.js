const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superAdmin");
const University = require("../models/university");

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

            const superadminDetails = await SuperAdmin.findOne({
                email: email
            });

            if (!superadminDetails) {
                return res.status(401).json({
                    code: 401,
                    message: "SuperAdmin with this email not found",
                });
            }

            const isMatch = await bcrypt.compare(password, superadminDetails.password);

            if (!isMatch) {
                return res.status(401).json({
                    code: 401,
                    message: "Invalid password",
                });
            }

            const token = jwt.sign(
                {
                    id: superadminDetails._id.toString(),
                    email: superadminDetails.email,
                    universityId: superadminDetails.universityId,
                    expiration: Date.now() + 3600000,
                },
                process.env.JWT_SecretKey,
                { expiresIn: "1h" }
            );
            const superAdminData = {
                _id: superadminDetails._id,
                name: superadminDetails.name,
                email: superadminDetails.email
            };
            res.status(200).json({
                code: 200,
                message: "Login successful",
                data: superAdminData,
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

    //#region : SUPERADMIN CRUD

    createSuperAdmin: async (req, res) => {
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
            const existingUser = await SuperAdmin.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(409).json({
                    code: 409,
                    message: "Super Admin with this email already exists",
                });
            }

            const universityId = req.body.universityId;
            const isExistUniversity = await University.findById(universityId);
            if (!isExistUniversity) {
                return res.status(404).json({
                    code: 404,
                    message: "University not found"
                });
            }

            //Password encription
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            //creating a new admin
            const newSuperAdmin = new SuperAdmin({
                name: req.body.name,
                email: req.body.email,
                universityId: req.body.universityId,
                password: hashedPassword,
            });
            const SuperAdminDetails = await newSuperAdmin.save();

            // Returning success message
            res.status(201).json({
                code: 201,
                message: "New Super Admin created successfully",
                data: SuperAdminDetails,
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

    getAllSuperAdmins: async (req, res) => {
        try {
            const superAdminList = await SuperAdmin.find().sort({ _id: -1 });
            if (superAdminList.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "No Super Admin found"
                });
            }
            res.json({
                code: 200,
                message: "Super Admins retrieved successfully",
                data: superAdminList
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

    getSuperAdminById: async (req, res) => {
        try {
            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const foundSuperAdmin = await SuperAdmin.findById(id);
            if (!foundSuperAdmin) {
                return res.status(404).json({
                    code: 404,
                    message: "Super Admin not found",
                });
            }
            res.json({
                code: 200,
                message: "Super Admin retrieved successfully",
                data: foundSuperAdmin
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    updateSuperAdmin: async (req, res) => {
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

            const universityId = req.body.universityId;
            if (universityId) {
                const isExistUniversity = await University.findById(universityId);
                if (!isExistUniversity) {
                    return res.status(404).json({
                        code: 404,
                        message: "University not found"
                    });
                }
            }

            const updateFields = {};
            const fieldsToUpdate = ['name', 'universityId'];
            fieldsToUpdate.forEach(field => {
                if (req.body[field]) {
                    updateFields[field] = req.body[field];
                }
            });

            const updatedSuperAdmin = await SuperAdmin.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedSuperAdmin) {
                return res.status(404).json({
                    code: 404,
                    message: "Super Admin not found",
                });
            }

            // Return the updated Super Admin
            res.status(200).json({
                code: 200,
                message: "Super Admin updated successfully",
                data: updatedSuperAdmin,
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

    deleteSuperAdmin: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedSuperAdmin = await SuperAdmin.findByIdAndDelete(id);
            if (!deletedSuperAdmin) {
                return res.status(404).json({
                    code: 404,
                    message: "Super Admin not found",
                });
            }

            res.status(200).json({
                code: 200,
                message: "Super Admin deleted successfully"
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

    getSuperAdminByUniversityId: async (req, res) => {
        try {
            const id = req.params.universityId; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const isExistUniversity = await University.findById(id)
            if (!isExistUniversity) {
                return res.status(404).json({
                    code: 404,
                    message: "University not found"
                });
            }

            const foundSuperAdminByUniversity = await SuperAdmin.find({
                universityId: id
            });
            if (foundSuperAdminByUniversity.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "Super Admin not found",
                });
            }
            res.json({
                code: 200,
                message: "Super Admin by University Id retrieved successfully",
                data: foundSuperAdminByUniversity
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