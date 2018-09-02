/* eslint-disable no-param-reassign */
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const User = require('../model/user.model');


exports.toNewModel = req => new User({
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
    nickName: req.body.nickName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    modifiedAt: moment.now(),
});

exports.updateModel = (user, req) => {
    user.email = req.body.email;
    user.nickName = req.body.nickName;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.modifiedAt = moment.now();
    return user;
};


const toObj = user => ({
    id: user._id,
    email: user.email,
    nickName: user.nickName,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    modifiedAt: user.modifiedAt,
});
exports.toObj = toObj;


exports.toList = users => users.map(u => toObj(u));

