const moment = require('moment');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt-nodejs');
const passport = require('../../config/passport');
const User = require('../model/user.model');
const userMgr = require('../user/user.manager');



exports.register = (req, res, next) => {
    const user = userMgr.toModel(new User(), req);
    user.createdAt = moment.now();
    user.modifiedAt = null;
    user.save()
        .then(savedUser => res.json(userMgr.toObj(savedUser)))
        .catch(e => next(e));
};

exports.changePassword = (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;
    User.findOne({ email: email })
        // eslint-disable-next-line consistent-return
        .then((user) => {
            if (!user) {
                return res.status(httpStatus.UNAUTHORIZED).send(`Invalid email [${email}]`);
            }
            if (!bcrypt.compareSync(oldPassword, user.passwordHash)) {
                return res.status(httpStatus.UNAUTHORIZED).send(`Invalid password [${oldPassword}]`);
            }
            // eslint-disable-next-line no-param-reassign
            user.passwordHash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null);
            user.save()
                .then(savedUser => res.json(userMgr.toObj(savedUser)))
                .catch(e => next(e));
        })
        .catch(e => next(e));
};

exports.login = (req, res, next) => {
    // eslint-disable-next-line consistent-return
    passport.authenticate('local', (err, user) => {
        if (err) {
            req.logout();
            return res.status(httpStatus.UNAUTHORIZED).send(err);
        }
        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).send('Missing user details');
        }
        req.login(user, (error) => {
            if (error) {
                req.logout();
                return res.status(httpStatus.UNAUTHORIZED).send(error);
            }
            return res.json(userMgr.toObj(user));
        });
    })(req, res, next);
};

exports.check = (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(userMgr.toObj(req.user));
    } else {
        return res.status(httpStatus.UNAUTHORIZED).send('Not Authenticated');
    }
};

exports.logout = (req, res) => {
    req.logout();
    return res.json({ status: 'OK' });
};
