const express = require('express');
// const validate = require('express-validation');
// const config = require('../../config/config');
const auth = require('../../middlewares/auth');
// const verbalValidation = require('./verbal.validation');
const verbalCtrl = require('./verbal.controller');

const router = express.Router(); // eslint-disable-line new-cap



router.route('/')

    /** GET /verbals/:verbalId - Get verbal */
    .get(auth.requiresLogin, verbalCtrl.get);



module.exports = router;
