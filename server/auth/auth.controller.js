const httpStatus = require('http-status');
const passport = require('../../config/passport');
const userMgr = require('../user/user.manager');



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

