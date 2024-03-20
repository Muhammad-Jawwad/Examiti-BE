const { validationResult } = require("express-validator");
const Organization = require("../models/organization");
const Class = require("../models/class");

module.exports = {
    createClass: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    message: "Validation error",
                    errors: errors.array()
                });
            }

            const organizationId = req.body.organizationId;
            const isExistOrganization = await Organization.findById(organizationId);
            if(!isExistOrganization){
                return res.status(404).json({
                    code: 404,
                    message: "Organizations not found"
                });
            }

            //creating a new org
            const newClass = new Class({
                name: req.body.name,
                academicYear: req.body.academicYear,
                organizationId: req.body.organizationId
            });
            const ClassDetails = await newClass.save();

            // Returning success message
            res.status(201).json({
                status: 201,
                message: "New Class created successfully",
                data: ClassDetails,
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

    getAllClasses: async (req, res) => {
        try {
            const classList = await Class.find().sort({ _id: -1 });
            if (classList.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "No Class found"
                });
            }
            res.json({
                code: 200,
                message: "Class retrieved successfully",
                data: classList
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

    getClassById: async (req, res) => {
        try {
            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    message: "id is required",
                });
            }

            const foundClass = await Class.findById(id);
            if (!foundClass) {
                return res.status(404).json({
                    code: 404,
                    message: "Class not found",
                });
            }
            res.json({
                code: 200,
                message: "Class retrieved successfully",
                data: foundClass
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    updateClass: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 400,
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

            const organizationId = req.body.organizationId;
            if (organizationId){
                const isExistOrganization = await Organization.findById(organizationId);
                if (!isExistOrganization) {
                    return res.status(404).json({
                        code: 404,
                        message: "Organizations not found"
                    });
                }
            }

            const updateFields = {};
            const fieldsToUpdate = ['name', 'academicYear', 'organizationId'];
            fieldsToUpdate.forEach(field => {
                if (req.body[field]) {
                    updateFields[field] = req.body[field];
                }
            });

            const updatedClass = await Class.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedClass) {
                return res.status(404).json({
                    code: 404,
                    message: "Class not found",
                });
            }

            // Return the updated Class
            res.status(200).json({
                code: 200,
                message: "Class updated successfully",
                data: updatedClass,
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

    deleteClass: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedClass = await Class.findByIdAndDelete(id);
            if (!deletedClass) {
                return res.status(404).json({
                    code: 404,
                    message: "Class not found",
                });
            }

            res.status(200).json({
                code: 200,
                message: "Class deleted successfully"
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

    getClassesByOrganization: async (req, res) => {
        try {
            const organizationId = req.params.id;
            if (!organizationId) {
                return res.status(400).json({
                    message: "organizationId is required in params",
                });
            }

            const classesByOrganizationList = await Class.find({organizationId}).sort({ _id: -1 });
            if (classesByOrganizationList.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "No Class by Organization found"
                });
            }
            res.json({
                code: 200,
                message: "Class by Organization retrieved successfully",
                data: classesByOrganizationList
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

}