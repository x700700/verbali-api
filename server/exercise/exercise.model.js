const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');


const ExerciseSchema = new mongoose.Schema({
    training_id: {
        type: String,
        required: true,
        index: true,
    },
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    played: {
        type: Number,
    },
    wrongs: {
        type: Number,
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
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
ExerciseSchema.method({
});


ExerciseSchema.statics = {
    get(id) {
        try {
            return this.findById(id)
                .exec()
                .then((exercise) => {
                    if (exercise) {
                        return exercise;
                    }
                    throw new APIError('No such exercise exists!', httpStatus.NOT_FOUND, { isPublic: false });
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

module.exports = mongoose.model('exercises', ExerciseSchema);
