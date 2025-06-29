const express = require('express');
const { registerValidation } = require('../validators/auth.validations');
const authController = require('../controllers/auth.controllers');

const router = express.Router();

router.post('/register', registerValidation, authController.register);

module.exports = router;
