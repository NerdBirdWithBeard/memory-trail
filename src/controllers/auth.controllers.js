const authServices = require('../services/auth.services');
const asyncHandler = require('../utils/asyncHandler');
const responseHandler = require('../utils/responseHandler');
const { validationResult } = require('express-validator');
const generateToken = require('../utils/generateToken');

module.exports.register = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    const user = await authServices.register(req.body);
    const token = generateToken(user.id);
    responseHandler(res, {accessToke: token}, 'New user successfully created');
});
