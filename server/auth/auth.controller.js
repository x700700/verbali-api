const moment = require('moment');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt-nodejs');
const logger = require('../../middlewares/logger');
const passport = require('../../middlewares/passport');
const User = require('../model/user.model');
const userMgr = require('../user/user.manager');


exports.register = (req, res, next) => {
    const user = userMgr.toNewModel(req);
    user.createdAt = moment.now();
    user.modifiedAt = null;
    user.save()
        .then(savedUser => res.json(userMgr.toObj(savedUser)))
        .catch(e => next(e));
};

exports.login = (req, res, next) => {
    // eslint-disable-next-line consistent-return
    passport.authenticate('local', (err, user) => {
        if (err) {
            req.logout();
            logger.error(err);
            return res.status(httpStatus.UNAUTHORIZED).send(err.message);
        }
        if (!user) {
            logger.error('no user found');
            return res.status(httpStatus.UNAUTHORIZED).send('Missing user credentials');
        }
        req.login(user, (error) => {
            if (error) {
                req.logout();
                logger.error(error);
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


exports.changePassword = (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;
    User.findOne({ email: email })
    // eslint-disable-next-line consistent-return
        .then((user) => {
            if (!user) {
                return res.status(httpStatus.UNAUTHORIZED).send(`Invalid email [${email}]`); // Todo - send APIError
            }
            if (!bcrypt.compareSync(oldPassword, user.passwordHash)) {
                return res.status(httpStatus.UNAUTHORIZED).send(`Invalid password [${oldPassword}]`); // Todo - send APIError
            }
            // eslint-disable-next-line no-param-reassign
            user.passwordHash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null);
            user.save()
                .then(savedUser => res.json(userMgr.toObj(savedUser)))
                .catch(e => next(e));
        })
        .catch(e => next(e));
};
