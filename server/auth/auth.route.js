const express = require('express');
const validate = require('express-validation');
const authValidation = require('./auth.validation');
const authCtrl = require('./auth.controller');
// const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap



router.route('/login')

    /** POST /auth/login - Login */
    .post(validate(authValidation.login), authCtrl.login);

router.route('/check')

    /** GET /auth/check - Check user is logged in */
    .get(authCtrl.check);



module.exports = router;
