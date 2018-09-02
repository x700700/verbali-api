const httpStatus = require('http-status');
const logger = require('../config/logger');

/**
 * @extends Error
 */
class ExtendableError extends Error {
    constructor(message, status, isPublic, apiErrorCode) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.apiErrorCode = apiErrorCode;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        Error.captureStackTrace(this, this.constructor.name);
    }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {number} apiErrorCode - API error code.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.

     */
    constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, meta) {
        const { apiErrorCode = -2, isPublic = true } = meta || {};
        super(message, status, isPublic, apiErrorCode);
        logger.error(message);
    }
}


module.exports = APIError;
