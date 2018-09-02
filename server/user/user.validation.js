const Joi = require('joi');
const { reqValidationOptionsStrict } = require('../common/validation-consts');


const mainFields = {
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
        options: reqValidationOptionsStrict,
    },
};
