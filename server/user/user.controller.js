const userMgr = require('./user.manager');


exports.get = (req, res) => res.json(req.user);


exports.update = (req, res, next) => {
    const user = userMgr.updateModel(req.user, req);
    user.save()
        .then(savedUser => res.json(userMgr.toObj(savedUser)))
        .catch(e => next(e));
};

exports.remove = (req, res, next) => {
    const { user } = req;
    user.remove()
        .then(deletedUser => res.json(userMgr.toObj(deletedUser)))
        .catch(e => next(e));
};
