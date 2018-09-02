const httpStatus = require('http-status');
const APIError = require('./APIError');


exports.requiresLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return next(new APIError('You must first sign in', httpStatus.UNAUTHORIZED));
    }
};
