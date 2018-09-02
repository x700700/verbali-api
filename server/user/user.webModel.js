/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt-nodejs');
const User = require('../model/user.model');


exports.toNewModel = req => new User({
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
    nickName: req.body.nickName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
});

exports.toUpdate = (req) => {
    const { nickName, firstName, lastName } = req.body;
    const user = {};
    if (nickName) user.nickName = nickName;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    return user;
};


const toObj = user => ({
    email: user.email,
    nickName: user.nickName,
    firstName: user.firstName,
    lastName: user.lastName,
    extra: {
        id: user._id,
        createdAt: user.createdAt,
        modifiedAt: user.modifiedAt,
    },
});
exports.toObj = toObj;


exports.toList = users => users.map(u => toObj(u));

