const Joi = require('joi');
const { reqValidationOptionsStrict } = require('../utils/validation-consts');


const mainFields = {
    email: Joi.string().required(),
    nickName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
};

module.exports = {
    createUser: {
        body: {
            ...mainFields,
            password: Joi.string().required(),
        },
        options: reqValidationOptionsStrict,
    },

    updateUser: {
        body: {
            ...mainFields,
        },
        params: {
            userId: Joi.string().hex().required(),
        },
        options: reqValidationOptionsStrict,
    },
};
