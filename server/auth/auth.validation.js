const Joi = require('joi');
const { reqValidationOptionsStrict } = require('../utils/validation-consts');

module.exports = {
    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required()
        },
        options: reqValidationOptionsStrict
    }
};
