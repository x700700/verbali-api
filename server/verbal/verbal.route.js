const express = require('express');
// const validate = require('express-validation');
// const config = require('../../config/config');
const auth = require('../../middlewares/auth');
// const verbalValidation = require('./verbal.validation');
const verbalCtrl = require('./verbal.controller');

const router = express.Router(); // eslint-disable-line new-cap



router.route('/')

    // GET /verbals/:verbalId - Get verbal
    .get(auth.requiresLogin, verbalCtrl.get);



/*
router.route('/search')

    // GET /users/search?username=:username - Get a user by username
    .get(auth.requiresLogin, userCtrl.find);


router.param('userId', auth.requiresLogin, userCtrl.load);
router.route('/:userId')

    // GET /users/:userId - Get user
    .get(auth.requiresLogin, userCtrl.get)

    // PUT /users/:userId - Update user
    .put(auth.requiresLogin, validate(userValidation.updateUser), userCtrl.update)

    // DELETE /users/:userId - Delete user
    .delete(auth.requiresLogin, userCtrl.remove);
*/



module.exports = router;
