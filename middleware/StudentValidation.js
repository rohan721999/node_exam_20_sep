const { body, validationResult } = require('express-validator');

// Reusable validation for the student body
const studentValidationRules = () => {
    return [
        body('fullName')
            .notEmpty().withMessage('FullName is required')
            .isString().withMessage('FullName must be a string')
            .trim(),
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid Email Id'),
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8 }).withMessage('Password Must be greater than 8 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
            .withMessage('Password must have at least one uppercase letter, one lowercase letter, and one special character'),
        body('semester')
            .isInt({ min: 1, max: 12 }).withMessage('Semester should be between 1 to 12'),
        body('branch')
            .optional()
            .isIn(['CSE', 'ECE', 'ME', 'CE', 'EE', 'Other']).withMessage('Invalid branch. Allowed values are CSE, ECE, ME, CE, EE, Other.'),
    ];
};

// Middleware to check for validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param || err.path]: err.msg }));

    return res.status(400).json({errors : extractedErrors});
};

module.exports = { studentValidationRules, validate };