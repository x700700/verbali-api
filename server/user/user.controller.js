const moment = require('moment');
const User = require('../model/user.model');
const userMgr = require('./user.manager');
// const logger = require('../../config/winston');


exports.load = (req, res, next, id) => {
    User.get(id)
        .then((user) => {
            req.user = user; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
};


exports.get = (req, res) => res.json(req.user);


exports.find = (req, res, next) => {
    const { username } = req.query;
    User.findOne({ username: username })
        .then(foundUser => res.json(userMgr.toObj(foundUser)))
        .catch(e => next(e));
};

exports.create = (req, res, next) => {
    const user = userMgr.toModel(new User(), req);
    user.createdAt = moment.now();
    user.modifiedAt = null;
    user.save()
        .then(savedUser => res.json(userMgr.toObj(savedUser)))
        .catch(e => next(e));
};

exports.update = (req, res, next) => {
    const user = userMgr.toModel(req.user, req);
    user.save()
        .then(savedUser => res.json(userMgr.toObj(savedUser)))
        .catch(e => next(e));
};

exports.list = (req, res, next) => {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(userMgr.toList(users)))
        .catch(e => next(e));
};

exports.remove = (req, res, next) => {
    const { user } = req;
    user.remove()
        .then(deletedUser => res.json(userMgr.toObj(deletedUser)))
        .catch(e => next(e));
};
