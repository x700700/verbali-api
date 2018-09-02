const userWebModel = require('./user.webModel');
const User = require('../model/user.model');


exports.get = (req, res) => res.json(req.user);


exports.update = (req, res, next) => {
    // User.findOneAndUpdate({ email: req.user.email }, userMgr.toUpdate(req), { new: true })
    req.user.update(userWebModel.toUpdate(req))
        .then(() => {
            User.get(req.user.id)
                .then(updatedUser => res.json(userWebModel.toObj(updatedUser)))
                .catch(e => next(e));
        })
        .catch(e => next(e));
};

exports.remove = (req, res, next) => {
    const { user } = req;
    user.remove()
        .then(deletedUser => res.json(userWebModel.toObj(deletedUser)))
        .catch(e => next(e));
};
