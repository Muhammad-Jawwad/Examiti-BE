const { body } = require("express-validator");
const { Types } = require("mongoose");

module.exports = {
    // Validation middleware for course
    validateCreateCourse: [
        body('name')
            .notEmpty().withMessage("name is required")
            .isString().withMessage("name must be a string"),
        body('courseCode')
            .notEmpty().withMessage("courseCode is required")
            .isString().withMessage("courseCode must be a string"),
        body('description')
            .notEmpty().withMessage("description is required")
            .isString().withMessage("description must be a string"),
        // body('departmentId')
        //     .custom(value => {
        //         if (!Types.ObjectId.isValid(value)) {
        //             throw new Error('Invalid departmentId');
        //         }
        //         return true;
        //     }),
        body('totalCredits')
            .notEmpty().withMessage("totalCredits is required")
            .isInt().withMessage("totalCredits must be a Integer"),
    ],

    // Validation middleware for update course
    validateUpdateCourse: [
        body('name')
            .optional()
            .isString().withMessage("name must be a string"),
        body('courseCode')
            .optional()
            .isString().withMessage("courseCode must be a string"),
        body('description')
            .optional()
            .isString().withMessage("description must be a string"),
        // body('departmentId')
        //     .custom(value => {
        //         if (!Types.ObjectId.isValid(value)) {
        //             throw new Error('Invalid departmentId');
        //         }
        //         return true;
        //     }),
        body('totalCredits')
            .optional()
            .isInt().withMessage("totalCredits must be a Integer"),
    ],
};
