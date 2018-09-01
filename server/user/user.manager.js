const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const User = require('../model/user.model');


exports.toModel = (user, req) => new User({
    email: req.body.email || user.email,
    passwordHash: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
    nickName: req.body.nickName || user.nickName,
    firstName: req.body.firstName || user.firstName,
    lastName: req.body.lastName || user.lastName,
    modifiedAt: moment.now(),
});


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

