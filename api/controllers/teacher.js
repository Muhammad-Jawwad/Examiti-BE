const { validationResult } = require("express-validator");
const Department = require("../models/department");
const Admin = require("../models/admin");
const Teacher = require("../models/teacher");
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

            const teacherDetails = await Teacher.findOne({
                email: email
            });

            if (!teacherDetails) {
                return res.status(401).json({
                    code: 401,
                    message: "Teacher with this email not found",
                });
            }

            const isMatch = await bcrypt.compare(password, teacherDetails.password);

            if (!isMatch) {
                return res.status(401).json({
                    code: 401,
                    message: "Invalid password",
                });
            }

            const token = jwt.sign(
                {
                    id: teacherDetails._id.toString(),
                    email: teacherDetails.email,
                    expiration: Date.now() + 3600000,
                },
                process.env.JWT_SecretKey,
                { expiresIn: "1h" }
            );
            const TeacherData = {
                _id: teacherDetails._id,
                name: teacherDetails.name,
                email: teacherDetails.email,
                departmentId: teacherDetails.departmentId
            };
            res.status(200).json({
                message: "Login successful",
                userDetails: TeacherData,
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

    //#region : TEACHER CRUD

    createTeacher: async (req, res) => {
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
            const existingUser = await Teacher.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(409).json({
                    code: 409,
                    message: "Teacher with this email already exists",
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

            //creating a new Teacher
            const newTeacher = new Teacher({
                name: req.body.name,
                email: req.body.email,
                departmentId: req.body.departmentId,
                teacherCode: req.body.teacherCode,
                designation: req.body.designation,
                password: hashedPassword,
            });
            const TeacherDetails = await newTeacher.save();

            // Returning success message
            res.status(201).json({
                code: 201,
                message: "New Teacher created successfully",
                data: TeacherDetails,
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

    getAllTeachers: async (req, res) => {
        try {
            const teacherList = await Teacher.find().sort({ _id: -1 });
            if (teacherList.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "No Teacher found"
                });
            }
            res.json({
                code: 200,
                message: "Teachers retrieved successfully",
                data: teacherList
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

    getTeacherById: async (req, res) => {
        try {
            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const foundTeacher = await Teacher.findById(id);
            if (!foundTeacher) {
                return res.status(404).json({
                    code: 404,
                    message: "Teacher not found",
                });
            }
            res.json({
                code: 200,
                message: "Teacher retrieved successfully",
                data: foundTeacher
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    updateTeacher: async (req, res) => {
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
            const fieldsToUpdate = ['name', 'teacherCode','designation','departmentId'];
            fieldsToUpdate.forEach(field => {
                if (req.body[field]) {
                    updateFields[field] = req.body[field];
                }
            });

            const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedTeacher) {
                return res.status(404).json({
                    code: 404,
                    message: "Teacher not found",
                });
            }

            // Return the updated Teacher
            res.status(200).json({
                code: 200,
                message: "Teacher updated successfully",
                data: updatedTeacher,
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

    deleteTeacher: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedTeacher = await Teacher.findByIdAndDelete(id);
            if (!deletedTeacher) {
                return res.status(404).json({
                    code: 404,
                    message: "Teacher not found",
                });
            }

            res.status(200).json({
                code: 200,
                message: "Teacher deleted successfully"
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

    getTeacherByDepartmentId: async (req, res) => {
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

            const foundTeacherByDepartment = await Teacher.find({
                departmentId: id
            });
            if (foundTeacherByDepartment.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "Teacher not found",
                });
            }
            res.json({
                code: 200,
                message: "Teacher by Department Id retrieved successfully",
                data: foundTeacherByDepartment
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