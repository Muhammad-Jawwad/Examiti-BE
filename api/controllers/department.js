const { validationResult } = require("express-validator");
const Department = require("../models/department");
const University = require("../models/university");

module.exports = {
    createDepartment: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    message: "Validation error",
                    errors: errors.array()
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

            //creating a new org
            const newDepartment = new Department({
                name: req.body.name,
                headOfDepartment: req.body.headOfDepartment,
                universityId: req.body.universityId,
                contactEmail: req.body.contactEmail,
            });
            const DepartmentDetails = await newDepartment.save();

            // Returning success message
            res.status(201).json({
                code: 201,
                message: "New Department created successfully",
                data: DepartmentDetails,
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

    getAllDepartments: async (req, res) => {
        try {
            const departmentList = await Department.find().sort({ _id: -1 });
            if (departmentList.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "No Department found"
                });
            }
            res.json({
                code: 200,
                message: "Departments retrieved successfully",
                data: departmentList
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

    getDepartmentById: async (req, res) => {
        try {
            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const foundDepartment = await Department.findById(id);
            if (!foundDepartment) {
                return res.status(404).json({
                    code: 404,
                    message: "Department not found",
                });
            }
            res.json({
                code: 200,
                message: "Department retrieved successfully",
                data: foundDepartment
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    updateDepartment: async (req, res) => {
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
            const fieldsToUpdate = ['name', 'headOfDepartment', 'contactEmail','universityId'];
            fieldsToUpdate.forEach(field => {
                if (req.body[field]) {
                    updateFields[field] = req.body[field];
                }
            });

            const updatedDepartment = await Department.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedDepartment) {
                return res.status(404).json({
                    code: 404,
                    message: "Department not found",
                });
            }

            // Return the updated Department
            res.status(200).json({
                code: 200,
                message: "Department updated successfully",
                data: updatedDepartment,
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

    deleteDepartment: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedDepartment = await Department.findByIdAndDelete(id);
            if (!deletedDepartment) {
                return res.status(404).json({
                    code: 404,
                    message: "Department not found",
                });
            }

            res.status(200).json({
                code: 200,
                message: "Department deleted successfully"
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
                    code: 400,
                    message: "organizationId is required in params",
                });
            }

            const classesByOrganizationList = await Class.find({ organizationId }).sort({ _id: -1 });
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