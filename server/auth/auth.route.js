const express = require('express');
const validate = require('express-validation');
const authValidation = require('./auth.validation');
const authCtrl = require('./auth.controller');
// const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap


router.route('/register')

    /** POST /auth/register - Register */
    .post(validate(authValidation.regisger), authCtrl.register); // Todo GDPR - prevent massive attack

router.route('/change-password')

    /** POST /auth/change-password - Change password */
    .post(validate(authValidation.regisger), authCtrl.register); // Todo GDPR - prevent massive attack

router.route('/login')

    /** POST /auth/login - Login */
    .post(validate(authValidation.login), authCtrl.login);

router.route('/check')

    /** GET /auth/check - Check user is logged in */
    .get(authCtrl.check);

router.route('/logout')

    /** GET /auth/logout - Logout */
    .get(authCtrl.logout);


module.exports = router;
