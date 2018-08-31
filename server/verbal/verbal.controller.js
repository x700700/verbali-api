const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const config = require('../../config/config');


exports.get = (req, res) => res.json({
    createdAt: 'Friday',
    text: 'Sometimes headache is jsut an headache.',
});

