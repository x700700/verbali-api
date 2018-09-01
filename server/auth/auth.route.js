const express = require('express');
const validate = require('express-validation');
const authValidation = require('./auth.validation');
const authCtrl = require('./auth.controller');
// const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap



/** POST /auth/login - Returns token if correct username and password is provided */
router.route('/login')
    .post(validate(authValidation.login), authCtrl.login);

router.route('/check')
    .get(authCtrl.check);


/*
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/authrequired');
    })
  })(req, res, next);
})



app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true,
}));
*/



module.exports = router;
