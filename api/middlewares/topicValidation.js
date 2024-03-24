const { body } = require("express-validator");
const { Types } = require("mongoose");

module.exports = {
    // Validation middleware for topic
    validateTopic: [
        body('name')
            .notEmpty().withMessage("name is required")
            .isString().withMessage("name must be a string"),
        body('description')
            .notEmpty().withMessage("description is required")
            .isString().withMessage("description must be a string"),
        body('courseId')
            .notEmpty().withMessage("courseId is required")
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid courseId');
                }
                return true;
            }),
    ],
};
