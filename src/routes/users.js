const express = require('express');
const router = express.Router();
const controller = require('../controllers/users-controller');
const { isAuthenticated } = require('../helpers/auth');

// Routes

router.get('/users/signin', controller.getSignIn);

router.post('/users/signin', controller.autenticate);

router.get('/users/signup', controller.getSignUp);

router.post('/users/signup', controller.signUp);

router.get('/users/logout', controller.logout);

//Export

module.exports = router;