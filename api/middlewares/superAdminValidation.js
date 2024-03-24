const { body } = require("express-validator");
const { Types } = require("mongoose");

module.exports = {

    // Validation middleware for super admin login
    validateSuperAdmin: [
        body('name')
            .notEmpty().withMessage("name is required")
            .isString().withMessage("name must be a string"),
        body('email')
            .notEmpty().withMessage("email is required")
            .isString().withMessage("email must be a string")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid email"),
        body('password')
            .notEmpty().withMessage("password is required")
            .isString().withMessage("password must be a string")
            .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
        body('universityId')
            .optional()
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid universityId');
                }
                return true;
            }),

    ],

    //validate super admin update
    validateUpdateSuperAdmin: [
        body('name')
            .optional()
            .isString().withMessage("name must be a string"),
        body('email')
            .optional()
            .isString().withMessage("email must be a string")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid email"),
        body('password')
            .optional()
            .isString().withMessage("password must be a string")
            .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
        body('universityId')
            .optional()
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid universityId');
                }
                return true;
            }),

    ],



};
