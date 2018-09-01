const Joi = require('joi');
const { reqValidationOptionsStrict } = require('../utils/validation-consts');

module.exports = {
    createUser: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        },
        options: reqValidationOptionsStrict,
    },

    updateUser: {
        body: {
            username: Joi.string().required(),
            mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
        },
        params: {
            userId: Joi.string().hex().required(),
        },
        options: reqValidationOptionsStrict,
    },
};
