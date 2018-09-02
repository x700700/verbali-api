const httpStatus = require('http-status');
const bcrypt = require('bcrypt-nodejs');
const logger = require('../../middlewares/logger');
const APIError = require('../../middlewares/APIError');
const passport = require('../../middlewares/passport');
const userWebModel = require('../user/user.webModel');


exports.register = (req, res, next) => {
    const user = userWebModel.toNewModel(req);
    user.save()
        .then(savedUser => res.json(userWebModel.toObj(savedUser)))
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
            return res.json(userWebModel.toObj(user));
        });
    })(req, res, next);
};


exports.logout = (req, res) => {
    req.logout();
    return res.json({ status: 'OK' });
};


exports.changePassword = (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;
    const { user } = req;
    if (!user) {
        throw new APIError('no authenticated user', httpStatus.UNAUTHORIZED);
    }
    if (user.email !== email) {
        throw new APIError('Bad Credentials', httpStatus.UNAUTHORIZED);
    }
    if (!bcrypt.compareSync(oldPassword, user.passwordHash)) {
        throw new APIError('Bad Credentials', httpStatus.UNAUTHORIZED);
    }
    // eslint-disable-next-line no-param-reassign
    user.passwordHash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null);
    user.save()
        .then(savedUser => res.json(userWebModel.toObj(savedUser)))
        .catch(e => next(e));
};
