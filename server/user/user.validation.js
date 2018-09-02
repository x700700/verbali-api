const Joi = require('joi');
const { reqValidationOptionsStrict } = require('../common/validation-consts');


    module.exports = {

    updateUser: {
        body: {
            nickName: Joi.string(),
            firstName: Joi.string(),
            lastName: Joi.string(),
        },
        options: reqValidationOptionsStrict,
    },
};
