'use strict'

const router = require('express').Router();
const validateRegister = require('../middlewares/validate_register.js');
const validateLogin = require('../middlewares/validate_login.js');

const AuthController = require('../controllers/auth');

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);




module.exports = router;