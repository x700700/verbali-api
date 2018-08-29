const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const APIError = require('../server/utils/APIError');
const config = require('../config/config');


/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
    res.status(err.status).json({
        status: err.status,
        message: err.isPublic && err.message ? err.message : httpStatus[err.status],
        isPublic: err.isPublic || false,
        apiErrorCode: err.apiErrorCode || -1,
        stack: config.env === 'development' ? err.stack : {},
    });
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        const unifiedErrorMessage = err.errors.map(error => `${error.location}: ${error.messages.join('. ')}`).join(' and ');
        const error = new APIError(unifiedErrorMessage, err.status, { apiErrorCode: -4 });
        return next(error);
    } else if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, { isPublic: err.isPublic || false, apiErrorCode: -1 });
        return next(apiError);
    }
    return next(err);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
    const err = new APIError('API Not Found', httpStatus.NOT_FOUND, { isPublic: false });
    return next(err);
};
