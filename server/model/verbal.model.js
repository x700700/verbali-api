const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../middlewares/APIError');


const VerbalSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
    editedAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
    archived: {
        type: Boolean,
        default: false,
        index: true,
    },
    public: {
        type: Boolean,
        default: false,
        index: true,
    },
    text: {
        type: Buffer,
    },
    size: {
        type: Number,
        index: true,
    },
    language: {
        type: String,
        index: true,
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


VerbalSchema.method({
});


VerbalSchema.statics = {
    get(id) {
        try {
            return this.findById(id)
                .exec()
                .then((verbal) => {
                    if (verbal) {
                        return verbal;
                    }
                    throw new APIError('No such verbal exists!', httpStatus.NOT_FOUND, { isPublic: false });
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
    },
};

module.exports = mongoose.model('verbals', VerbalSchema);
