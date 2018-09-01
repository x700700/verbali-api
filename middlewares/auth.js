


exports.requiresLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        const err = new Error('You must first sign in.');
        err.status = 401;
        return next(err);
    }
    /*
    if (req.session && req.session.userId) {
        return next();
    } else {
        const err = new Error('You must first sign in.');
        err.status = 401;
        return next(err);
    }
    */
};
