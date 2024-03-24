const { validationResult } = require("express-validator");
const University = require("../models/university");

module.exports = {
    createUniversity: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    message: "Validation error",
                    errors: errors.array()
                });
            }

            //creating a new org
            const newUniversity = new University({
                name: req.body.name,
                website: req.body.website,
                location: req.body.location,
                establishedYear: req.body.establishedYear,
                contactEmail: req.body.contactEmail,
            });
            const UniversityDetails = await newUniversity.save();

            // Returning success message
            res.status(201).json({
                code: 201,
                message: "New University created successfully",
                data: UniversityDetails,
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

    getUniversity: async (req, res) => {
        try {
            const universityList = await University.find().sort({ _id: -1 });
            if (universityList.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "No universities found"
                });
            }
            res.json({
                code: 200,
                message: "universities retrieved successfully",
                data: universityList
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

    getUniversityById: async (req, res) => {
        try {
            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const foundUniversity = await University.findById(id);
            if (!foundUniversity) {
                return res.status(404).json({
                    code: 404,
                    message: "University not found",
                });
            }
            res.json({
                code: 200,
                message: "University retrieved successfully",
                data: foundUniversity
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    updateUniversity: async (req, res) => {
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

            const updateFields = {};
            const fieldsToUpdate = ['name', 'establishedYear', 'location', 'website', 'contactEmail'];
            fieldsToUpdate.forEach(field => {
                if (req.body[field]) {
                    updateFields[field] = req.body[field];
                }
            });

            const updatedUniversity = await University.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedUniversity) {
                return res.status(404).json({
                    code: 404,
                    message: "University not found",
                });
            }

            // Return the updated University
            res.status(200).json({
                code: 200,
                message: "University updated successfully",
                data: updatedUniversity,
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

    deleteUniversity: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedUniversity = await University.findByIdAndDelete(id);
            if (!deletedUniversity) {
                return res.status(404).json({
                    code: 404,
                    message: "University not found",
                });
            }

            res.status(200).json({
                code: 200,
                message: "University deleted successfully"
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

}