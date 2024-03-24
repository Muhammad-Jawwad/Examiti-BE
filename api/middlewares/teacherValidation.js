const { body } = require("express-validator");
const { Types } = require("mongoose");

module.exports = {
    validateTeacherLogin: [
        body('email')
            .notEmpty().withMessage("email is required")
            .isString().withMessage("email must be a string")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid email"),
        body('password')
            .notEmpty().withMessage("password is required")
            .isString().withMessage("password must be a string")
            .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
    ],

    // Validation middleware for teacher
    validateTeacher: [
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
        // body('departmentId')
        //     .notEmpty().withMessage("departmentId is required")
        //     .custom(value => {
        //         if (!Types.ObjectId.isValid(value)) {
        //             throw new Error('Invalid departmentId');
        //         }
        //         return true;
        //     }),
        body('designation')
            .notEmpty().withMessage("designation is required")
            .isString().withMessage("designation must be a string"),
    ],
};
