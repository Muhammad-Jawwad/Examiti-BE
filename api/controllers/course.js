const { validationResult } = require("express-validator");
const Department = require("../models/department");
const Course = require("../models/course");

module.exports = {

    //#region : COURSES CRUD

    createCourse: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    message: "Validation error",
                    errors: errors.array()
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

            //creating a new org
            const newCourse = new Course({
                name: req.body.name,
                courseCode: req.body.courseCode,
                departmentIdId: req.body.departmentIdId,
                description: req.body.description,
                totalCredits: req.body.totalCredits,
            });
            const CourseDetails = await newCourse.save();

            // Returning success message
            res.status(201).json({
                code: 201,
                message: "New Course created successfully",
                data: CourseDetails,
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

    getAllCourses: async (req, res) => {
        try {
            const courseList = await Course.find().sort({ _id: -1 });
            if (courseList.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "No Course found"
                });
            }
            res.json({
                code: 200,
                message: "Courses retrieved successfully",
                data: courseList
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

    getCourseById: async (req, res) => {
        try {
            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const foundCourse = await Course.findById(id);
            if (!foundCourse) {
                return res.status(404).json({
                    code: 404,
                    message: "Course not found",
                });
            }
            res.json({
                code: 200,
                message: "Course retrieved successfully",
                data: foundCourse
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    updateCourse: async (req, res) => {
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
            const fieldsToUpdate = ['name', 'courseCode', 'description', 'departmentId','totalCredits'];
            fieldsToUpdate.forEach(field => {
                if (req.body[field]) {
                    updateFields[field] = req.body[field];
                }
            });

            const updatedCourse = await Course.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedCourse) {
                return res.status(404).json({
                    code: 404,
                    message: "Course not found",
                });
            }

            // Return the updated Course
            res.status(200).json({
                code: 200,
                message: "Course updated successfully",
                data: updatedCourse,
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

    deleteCourse: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedCourse = await Course.findByIdAndDelete(id);
            if (!deletedCourse) {
                return res.status(404).json({
                    code: 404,
                    message: "Course not found",
                });
            }

            res.status(200).json({
                code: 200,
                message: "Course deleted successfully"
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

    coursesByDepartmentId: async (req, res) => {
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

            const foundCourseByDepartment = await Course.find({
                departmentId: id
            });
            if (foundCourseByDepartment.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "Course not found",
                });
            }
            res.json({
                code: 200,
                message: "Course by Department Id retrieved successfully",
                data: foundCourseByDepartment
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