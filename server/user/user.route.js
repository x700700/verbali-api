const express = require('express');
const validate = require('express-validation');
const auth = require('../../middlewares/auth');
const userValidation = require('./user.validation');
const userCtrl = require('./user.controller');


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /users - Get list of users */
    .get(auth.requiresLogin, userCtrl.list)

    /** POST /users - Create new user */
    .post(validate(userValidation.createUser), userCtrl.create); // Todo - prevent massive attack



router.route('/search')

    /** GET /users/search?username=:username - Get a user by username */
    .get(auth.requiresLogin, userCtrl.find);



router.param('userId', userCtrl.load);
router.route('/:userId')

    /** GET /users/:userId - Get user */
    .get(auth.requiresLogin, userCtrl.get)

    /** PUT /users/:userId - Update user */
    .put(auth.requiresLogin, validate(userValidation.updateUser), userCtrl.update)

    /** DELETE /users/:userId - Delete user */
    .delete(auth.requiresLogin, userCtrl.remove);



module.exports = router;
