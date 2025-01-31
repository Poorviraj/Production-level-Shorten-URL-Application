const express = require('express');

const {
    AuthenticationMiddleware,
    AuthorizationMiddleware
} = require('../../middlewares/auth.middleware')

const {
    DeleteUserByUserIdController
} = require('../../controllers/userController')

const AuthRouter = express.Router();
const {
    SignupController,
    SigninController
} = require('../../controllers/auth.controller');

AuthRouter.post('/signup', SignupController);
AuthRouter.post('/signin', SigninController);

AuthRouter.delete("/delete/:userId",AuthenticationMiddleware,AuthorizationMiddleware("ORG_ADMIN"),DeleteUserByUserIdController)

module.exports = AuthRouter;