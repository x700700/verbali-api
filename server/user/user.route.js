const express = require('express');
const validate = require('express-validation');
const auth = require('../../middlewares/auth');
const userValidation = require('./user.validation');
const userCtrl = require('./user.controller');


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    // PUT /users - Update user
    .put(auth.requiresLogin, validate(userValidation.updateUser), userCtrl.update)

    // DELETE /users/ - Delete user
    .delete(auth.requiresLogin, userCtrl.remove);



module.exports = router;
