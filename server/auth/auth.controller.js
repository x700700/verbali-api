const moment = require('moment');
const httpStatus = require('http-status');
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
    next();
};

exports.login = (req, res, next) => {
    // eslint-disable-next-line consistent-return
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(httpStatus.UNAUTHORIZED).send(err);
        }
        if (!user) {
            return res.redirect('/login'); // Todo - on login failed
        }
        req.login(user, (error) => {
            if (error) {
                return res.status(httpStatus.UNAUTHORIZED).send(error);
            }
            return res.json(userMgr.toObj(user));
        });
    })(req, res, next);
};

exports.check = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.json({ status: 'OK' });
    } else {
        return res.status(httpStatus.UNAUTHORIZED).send('Not Authenticated');
    }
};

