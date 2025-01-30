const express = require('express');

const AuthRouter = express.Router();
const {
    SignupController,
    SigninController
} = require('../../controllers/auth.controller');

AuthRouter.post('/signup', SignupController);
AuthRouter.post('/signin', SigninController);

module.exports = AuthRouter;