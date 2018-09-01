const httpStatus = require('http-status');
const passport = require('../../config/passport');
const APIError = require('../utils/APIError');
const config = require('../../config/config');



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
        res.json({ result: 'OK' });
    } else {
        const error = { message: 'not authenticated' };
        res.next(error);
    }
};


/*
const login = (req, res, next) => {
    try {
        // Ideally you'll fetch this from the db
        // Idea here was to show how jwt works with simplicity
        if (req.body.username === user.username && req.body.password === user.password) {

        }
        throw new APIError('Authentication error', httpStatus.UNAUTHORIZED);
    } catch (err) {
        return next(err);
    }
};

const getRandomNumber = (req, res) => res.json({
        user: req.user,
        num: Math.random() * 100
    });
*/

