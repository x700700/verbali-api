/* eslint-disable func-names */
const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../middlewares/APIError');


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
    },
});


UserSchema.pre('save', function (next) {
    this.createdAt = Date.now();
    this.modifiedAt = null;
    next();
});
UserSchema.pre('update', function (next) {
    this.update({
        modifiedAt: Date.now(),
    });
    next();
});
UserSchema.pre('findOneAndUpdate', function (next) {
    this.update({
        modifiedAt: Date.now(),
    });
    next();
});


UserSchema.method({
});

UserSchema.statics = {
    get(id) {
        try {
            return this.findById(id)
                .exec()
                .then((user) => {
                    if (user) {
                        return user;
                    }
                    throw new APIError('No such user exists!', httpStatus.NOT_FOUND, { isPublic: false });
                });
        } catch (err) {
            return Promise.reject(err);
        }
    },
};


module.exports = mongoose.model('users', UserSchema);
