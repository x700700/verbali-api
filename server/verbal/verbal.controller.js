// const httpStatus = require('http-status');
// const config = require('../../config/config');


/*
exports.load = (req, res, next, id) => {
    User.get(id)
        .then((user) => {
            req.user = user; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
};

exports.get = (req, res) => res.json(req.user);


exports.find = (req, res, next) => {
    const { email } = req.query;
    User.findOne({ email: email })
        .then(foundUser => res.json(userMgr.toObj(foundUser)))
        .catch(e => next(e));
};
*/



exports.get = (req, res) => {
    res.json({
        userId: req.user.id,
        email: req.user.email,
        createdAt: 'Friday',
        text: 'Sometimes headache is jsut an headache.',
    });
};

/*
exports.list = (req, res, next) => {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(userMgr.toList(users)))
        .catch(e => next(e));
};
*/
