const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');


const TrainingSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    },
    played: {
        type: Number,
    },
    success_ratio: {
        type: Number,
    },
    deleted: {
        type: Boolean,
    },
});


/**
 * Add your
 * - pre-save hooks
        * Todo - update modifiedBy
 * - validations
        * Todo - validate q/a length
 * - virtuals
 */

/**
 * Methods
 */
TrainingSchema.method({
});


TrainingSchema.statics = {
    get(id) {
        try {
            return this.findById(id)
                .exec()
                .then((training) => {
                    if (training) {
                        return training;
                    }
                    throw new APIError('No such training exists!', httpStatus.NOT_FOUND, { isPublic: false });
                });
        } catch (err) {
            return Promise.reject(err);
        }
    },

    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

module.exports = mongoose.model('trainings', TrainingSchema);
