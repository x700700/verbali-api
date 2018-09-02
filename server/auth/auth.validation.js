const Joi = require('joi');
const { reqValidationOptionsStrict } = require('../common/validation-consts');

module.exports = {
    regisger: {
        body: {
            nickName: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
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
        /*
        params: {
            userId: Joi.string().hex().required(),
        },
        */
        body: {
            email: Joi.string().required(),
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
        },
        options: reqValidationOptionsStrict,
    },
};
