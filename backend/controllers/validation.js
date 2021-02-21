// Let's Import Validationresult and check from express-validator.
const { check, validationResult } = require('express-validator');

// Let's Validate signup request first
exports.validate_Signup_Request = [
    // Actually this is an array
    check('name')
    .notEmpty()
    .withMessage('Oops! I forgot to Enter my Name.'),

    check('email')
    .isEmail()
    .withMessage('I should Enter my Email Id.'),

    check('password')
    .isLength({min:8})
    .withMessage('Oh k..Password must be 8 characters long')
];

exports.validate_Login_Request = [
    check('email')
    .isEmail()
    .withMessage('I think I should Enter my Email Id to login.'),

    check('password')
    .isLength({min:8})
    .withMessage('Oh k..Password must be 8 characters long')
];


exports.is_Request_Validated = (req, res, next) => {
    // This will return all the erros while validation and it is provided
    // By express-validator
    const errors = validationResult(req); // store all errors to validationResult method

    if(errors.array().length > 0){
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    // If there is no error then simply run next function
    next();
}