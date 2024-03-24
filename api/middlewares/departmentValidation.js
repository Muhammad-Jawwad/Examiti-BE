const { body } = require("express-validator");
const { Types } = require("mongoose");

module.exports = {
    // Validation middleware for department
    validateDepartment: [
        body('name')
            .notEmpty().withMessage("name is required")
            .isString().withMessage("name must be a string"),
        body('universityId')
            .notEmpty().withMessage("universityId is required")
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid universityId');
                }
                return true;
            }),
        body('headOfDepartment')
            .notEmpty().withMessage("description is required")
            .isString().withMessage("headOfDepartment must be a string"),
        body('contactEmail')
            .isString().withMessage("contactEmail must be a string")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid contactEmail")
    ],
};
