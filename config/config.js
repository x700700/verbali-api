// const path = require('path');
const Joi = require('joi');


require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    PORT: Joi.number()
        .default(4069),
    MONGOOSE_DEBUG: Joi.boolean()
        .when('NODE_ENV', {
            is: Joi.string().equal('development'),
            then: Joi.boolean().default(true),
            otherwise: Joi.boolean().default(false),
        }),
    MONGO_HOST: Joi.string().required()
        .description('Mongo DB host url')
        .required(),
    MONGO_PORT: Joi.number()
        .description('Mongo DB host connection port')
        .default(27017),
    MONGO_USERNAME: Joi.string()
        .description('api username')
        .required(),
    MONGO_PASSWORD: Joi.string()
        .description("api user's password")
        .required(),
    MONGO_DATABASE: Joi.string()
        .description('api Mongo database name')
        .required(),
}).unknown(false);

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT,
        username: envVars.MONGO_USERNAME,
        password: envVars.MONGO_PASSWORD,
        db: envVars.MONGO_DATABASE,
    },
};

module.exports = config;
