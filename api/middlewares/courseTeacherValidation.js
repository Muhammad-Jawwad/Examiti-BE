const { body } = require("express-validator");
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
};
