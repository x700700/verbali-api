const passport = require('../../config/passport');



exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (info) {
            return res.send(info.message);
        }
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.login(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.json(user);
        });
    })(req, res, next);
};

exports.check = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.json({ message: 'signed in' });
    } else {
        const error = { message: 'not authenticated' };
        res.next(error);
    }
};

