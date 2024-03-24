const { body } = require("express-validator");

module.exports = {
    // Validation middleware for university
    validateUniversity: [
        body('name')
            .notEmpty().withMessage("name is required")
            .isString().withMessage("name must be a string"),
        body('location')
            .notEmpty().withMessage("location is required")
            .isString().withMessage("location must be a string"),
        body('establishedYear')
            .notEmpty().withMessage("establishedYear is required")
            .isInt().withMessage("establishedYear must be a Int"),
        body('website')
            .notEmpty().withMessage("website is required")
            .isString().withMessage("website must be a string"),
        body('contactEmail')
            .notEmpty().withMessage("contactEmail is required")
            .isString().withMessage("contactEmail must be a string")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid contactEmail"),
    ],
};
