const express = require('express');
const userRoutes = require('./user/user.route');
const authRoutes = require('./auth/auth.route');
const verbalsRoute = require('./verbal/verbal.route');


const router = express.Router(); // eslint-disable-line new-cap


router.get('/status', (req, res) =>
    res.send('OK'),
);

router.use('/users', userRoutes);

router.use('/auth', authRoutes);

router.use('/verbals', verbalsRoute);


module.exports = router;
