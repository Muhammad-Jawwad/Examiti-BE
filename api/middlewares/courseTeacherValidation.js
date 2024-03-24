const { body } = require("express-validator");
const { Types } = require("mongoose");

module.exports = {
    // Validation middleware for courseTeacher
    validateCourseTeacher: [
        body('courseId')
            .notEmpty().withMessage("courseId is required")
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid courseId');
                }
                return true;
            }),
        body('teacherId')
            .notEmpty().withMessage("teacherId is required")
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid courseId');
                }
                return true;
            }),
        body('teachingSemester')
            .isInt().withMessage("teachingSemester must be a Integer"),

    ],

    // Validation middleware for update courseTeacher
    validateUpdateCourseTeacher: [
        body('courseId')
            .optional()
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid courseId');
                }
                return true;
            }),
        body('teacherId')
            .optional()
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid courseId');
                }
                return true;
            }),
        body('teachingSemester')
            .optional()
            .isInt().withMessage("teachingSemester must be a Integer"),

    ]
};
