const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const config = require('../../config/config');

// sample user, used for authentication
const user = {
    username: 'react',
    password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 */
const login = (req, res, next) => {
    try {
        // Ideally you'll fetch this from the db
        // Idea here was to show how jwt works with simplicity
        if (req.body.username === user.username && req.body.password === user.password) {
            const token = jwt.sign({
                username: user.username
            }, config.jwtSecret);
            return res.json({
                token,
                username: user.username
            });
        }
        throw new APIError('Authentication error', httpStatus.UNAUTHORIZED);
    } catch (err) {
        return next(err);
    }
};

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 */
const getRandomNumber = (req, res) => res.json({
        user: req.user,
        num: Math.random() * 100
    });


module.exports = { login, getRandomNumber };
