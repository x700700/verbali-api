const Joi = require('joi');
const { reqValidationOptionsStrict } = require('../common/validation-consts');


const mainFields = {
    email: Joi.string().required(),
    nickName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
};

module.exports = {
    mainFields: mainFields,

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
