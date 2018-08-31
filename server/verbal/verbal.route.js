const express = require('express');
const validate = require('express-validation');
// const authValidation = require('./verbal.validation');
const verbalCtrl = require('./verbal.controller');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap



/** POST /auth/login - Returns token if correct username and password is provided */
router.route('/get')
    .get(verbalCtrl.get);



module.exports = router;
