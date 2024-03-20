const { validationResult } = require("express-validator");
const Organization = require("../models/organization");

module.exports = {
    createOrganization: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    message: "Validation error",
                    errors: errors.array()
                });
            }

            //creating a new org
            const newOrganization = new Organization({
                name: req.body.name,
                description: req.body.description,
                location: req.body.location
            });
            const OrganizationDetails = await newOrganization.save();

            // Returning success message
            res.status(201).json({
                status: 201,
                message: "New Organization created successfully",
                data: OrganizationDetails,
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
    
    getOrganization: async (req, res) => {
        try {
            const organizationList = await Organization.find().sort({ _id: -1 });
            if (organizationList.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "No Organizations found"
                });
            }
            res.json({
                code: 200,
                message: "Organizations retrieved successfully",
                data: organizationList
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

    getOrganizationById: async (req, res) => {
        try {
            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    message: "id is required",
                });
            }

            const foundOrganization = await Organization.findById(id);
            if (!foundOrganization) {
                return res.status(404).json({
                    code: 404,
                    message: "Organization not found",
                });
            }
            res.json({
                code: 200,
                message: "Organization retrieved successfully",
                data: foundOrganization
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    updateOrganization: async (req, res) => {
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

            const updateFields = {};
            const fieldsToUpdate = ['name', 'description', 'location'];
            fieldsToUpdate.forEach(field => {
                if (req.body[field]) {
                    updateFields[field] = req.body[field];
                }
            });

            const updatedOrganization = await Organization.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedOrganization) {
                return res.status(404).json({
                    code: 404,
                    message: "Organization not found",
                });
            }

            // Return the updated Organization
            res.status(200).json({
                code: 200,
                message: "Organization updated successfully",
                data: updatedOrganization,
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

    deleteOrganization: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedOrganization = await Organization.findByIdAndDelete(id);
            if (!deletedOrganization) {
                return res.status(404).json({
                    code: 404,
                    message: "Organization not found",
                });
            }

            res.status(200).json({
                code: 200,
                message: "Organization deleted successfully"
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