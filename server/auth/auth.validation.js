const Joi = require('joi');
const { reqValidationOptionsStrict } = require('../utils/validation-consts');

module.exports = {
    login: {
        body: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
        options: reqValidationOptionsStrict,
    },
};
