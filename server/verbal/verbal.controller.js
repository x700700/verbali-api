const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const config = require('../../config/config');


exports.get = (req, res) => {
    return res.json({
        userId: req.user.id,
        email: req.user.email,
        createdAt: 'Friday',
        text: 'Sometimes headache is jsut an headache.',
    });
};

