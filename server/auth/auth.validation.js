const Joi = require('joi');
const { reqValidationOptionsStrict } = require('../utils/validation-consts');
const userValidation = require('../user/user.validation');

module.exports = {
    regisger: {
        body: {
            ...userValidation.mainFields,
            password: Joi.string().required(),
        },
        options: reqValidationOptionsStrict,
    },

    login: {
        body: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
        /*
        query: {
            shunra: Joi.string().required(),
        },
        */
        options: reqValidationOptionsStrict,
    },

    changePassword: {
        body: {
            email: Joi.string().required(),
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
        },
        options: reqValidationOptionsStrict,
    },
};
