const moment = require('moment');
const httpStatus = require('http-status');
const APIError = require('../../middlewares/APIError');
const auth = require('../../middlewares/auth');
const User = require('../model/user.model');
const userMgr = require('./user.manager');
// const logger = require('../../config/winston');


exports.get = (req, res) => res.json(req.user);


exports.update = (req, res, next) => {
    const user = userMgr.updateModel(req.user, req);
    user.save()
        .then(savedUser => res.json(userMgr.toObj(savedUser)))
        .catch(e => next(e));
};

exports.remove = (req, res, next) => {
    const { user } = req;
    user.remove()
        .then(deletedUser => res.json(userMgr.toObj(deletedUser)))
        .catch(e => next(e));
};
