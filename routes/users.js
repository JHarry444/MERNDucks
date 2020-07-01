const router = require('express').Router();
const { login, register } = require('../services/user_service');

router.post('/create', register);

router.post('/login', login);

module.exports = router;