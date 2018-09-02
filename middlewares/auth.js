const httpStatus = require('http-status');
const APIError = require('./APIError');
const logger = require('./logger');


exports.requiresLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        logger.info(`HTTP origin [${req.user && req.user.email}] req: ${req.baseUrl}`);
        return next();
    } else {
        logger.error(`Unauthenticated request origin [${req.ip}] - req: ${req.baseUrl}`);
        return next(new APIError('You must first sign in', httpStatus.UNAUTHORIZED));
    }
};
