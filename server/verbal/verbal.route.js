const express = require('express');
const validate = require('express-validation');
const config = require('../../config/config');
const auth = require('../../middlewares/auth');
// const authValidation = require('./verbal.validation');
const verbalCtrl = require('./verbal.controller');

const router = express.Router(); // eslint-disable-line new-cap



router.route('/get')
    .get(auth.requiresLogin, verbalCtrl.get);



module.exports = router;
