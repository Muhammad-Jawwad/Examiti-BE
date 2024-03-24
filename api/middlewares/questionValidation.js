const { body } = require("express-validator");
module.exports = {
    // Validation middleware for question
    validateQuestion: [
        body('question')
            .notEmpty().withMessage("question is required")
            .isString().withMessage("question must be a string"),
        body('marks')
            .notEmpty().withMessage("marks is required")
            .isInt().withMessage("marks must be a Int"),
        body('category')
            .notEmpty().withMessage("category is required")
            .isString().withMessage("category must be a string"),
        body('type')
            .notEmpty().withMessage("type is required")
            .isString().withMessage("type must be a string"),
        body('scope')
            .isString().withMessage("scope must be a string"),
        body('subjectTeacherId')
            .notEmpty().withMessage("subjectTeacherId is required")
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid subjectTeacherId');
                }
                return true;
            }),
        body('topicId')
            .notEmpty().withMessage("topicId is required")
            .custom(value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid topicId');
                }
                return true;
            }),
        body('difficultyLevel')
            .isInt().withMessage("difficultyLevel must be a Int"),
        body('isApproved')
            .isBoolean().withMessage("isApproved must be a string"),
    ],
};
