const express = require('express');
const validate = require('express-validation');
const userValidation = require('./user.validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /users - Get list of users */
    .get(userCtrl.list)

    /** POST /users - Create new user */
    .post(validate(userValidation.createUser), userCtrl.create);



router.route('/find')

    /** GET /users/search?username=:username - Get a user by username */
    .get(userCtrl.find);



router.param('userId', userCtrl.load);
router.route('/:userId')

    /** GET /users/:userId - Get user */
    .get(userCtrl.get)

    /** PUT /users/:userId - Update user */
    .put(validate(userValidation.updateUser), userCtrl.update)

    /** DELETE /users/:userId - Delete user */
    .delete(userCtrl.remove);



module.exports = router;
