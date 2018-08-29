const User = require('./user.model');
// const logger = require('../../config/winston');


/**
 * Load user and append to req.
 */
const load = (req, res, next, id) => {
    User.get(id)
        .then((user) => {
            req.user = user; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
};

/**
 * Get user
 * @returns {User}
 */
const get = (req, res) => res.json(req.user);


/**
 * Search user by name
 * @returns {User}
 */
const find = (req, res, next) => {
    const { username } = req.query;
    User.findOne({ username: username })
        .then(foundUser => res.json(foundUser))
        .catch(e => next(e));
};

/**
 * Create new user
 * @returns {User}
 */
const create = (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
};

/**
 * Update existing user
 * @returns {User}
 */
const update = (req, res, next) => {
    const { user } = req;
    user.username = req.body.username;
    user.mobileNumber = req.body.mobileNumber;

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
};

/**
 * Get user list.
 * @returns {User[]}
 */
const list = (req, res, next) => {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
};

/**
 * Delete user.
 * @returns {User}
 */
const remove = (req, res, next) => {
    const { user } = req;
    user.remove()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
};


module.exports = { load, get, find, create, update, list, remove };
