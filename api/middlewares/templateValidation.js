const { body } = require("express-validator");
const { Types } = require("mongoose");

module.exports = {
    // Validation middleware for template
    validateTemplate: [
        body('name')
            .notEmpty().withMessage("name is required")
            .isString().withMessage("name must be a string"),
        body('examType')
            .notEmpty().withMessage("examType is required")
            .isString().withMessage("examType must be a string"),
        body('duration')
            .notEmpty().withMessage("duration is required")
            .isInt().withMessage("duration must be a int"),
        body('totalMarks')
            .notEmpty().withMessage("totalMarks is required")
            .isInt().withMessage("totalMarks must be a int"),
        body('header')
            .notEmpty().withMessage("header is required")
            .isString().withMessage("header must be a string"),
        body('footer')
            .notEmpty().withMessage("footer is required")
            .isString().withMessage("footer must be a string"),
        body('courseId')
            .notEmpty().withMessage("courseId is required")
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid courseId');
                }
                return true;
            }),
        body('description')
            .isString().withMessage("description must be a string"),
        body('media')
            .isString().withMessage("media must be a string"),
        body('status')
            .isString().withMessage("status must be a string"),

    ],
    // Validation middleware for update template
    validateUpdateTemplate: [
        body('name')
            .optional()
            .isString().withMessage("name must be a string"),
        body('examType')
            .optional()
            .isString().withMessage("examType must be a string"),
        body('duration')
            .optional()
            .isInt().withMessage("duration must be a int"),
        body('totalMarks')
            .optional()
            .isInt().withMessage("totalMarks must be a int"),
        body('header')
            .optional()
            .isString().withMessage("header must be a string"),
        body('footer')
            .optional()
            .isString().withMessage("footer must be a string"),
        body('courseId')
            .optional()
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid courseId');
                }
                return true;
            }),
        body('description')
            .optional()
            .isString().withMessage("description must be a string"),
        body('media')
            .optional()
            .isString().withMessage("media must be a string"),
        body('status')
            .optional()
            .isString().withMessage("status must be a string"),

    ],
};
