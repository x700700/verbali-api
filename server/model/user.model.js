const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * User Schema
 */

// Todo GDPR - encrypt db

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    nickName: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
    /**
     * Get user
     */
    get(id) {
        try {
            return this.findById(id)
                .exec()
                .then((user) => {
                    if (user) {
                        return user;
                    }
                    throw new APIError('No such user exists!', httpStatus.NOT_FOUND, { isPublic: false });
                }); // Todo - .catch instead of try
        } catch (err) {
            return Promise.reject(err);
        }
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     */
    list({ skip = 0, limit = 50 } = {}) {
        try {
            return this.find()
                .sort({ createdAt: -1 })
                .skip(+skip)
                .limit(+limit)
                .exec();
        } catch (err) {
            return Promise.reject(err);
        }
    },
};


module.exports = mongoose.model('users', UserSchema);
