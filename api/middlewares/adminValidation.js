const { body } = require("express-validator");
module.exports = {
    // Validation middleware for login
    validateLogin: [
        body('email')
            .notEmpty().withMessage("email is required")
            .isString().withMessage("email must be a string")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid email"),
        body('password')
            .notEmpty().withMessage("password is required")
            .isString().withMessage("password must be a string")
            .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
    ],

    

};
