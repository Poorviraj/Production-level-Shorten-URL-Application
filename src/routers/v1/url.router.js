const express = require('express');

const URLRouter = express.Router();

const {CreateNewURLController} = require('./../../controllers/urlController');
const {getAllUrlsFromUser} = require('../../controllers/userController');
const {AuthenticationMiddleware} = require('../../middlewares/auth.middleware');

URLRouter.post("/new",AuthenticationMiddleware,CreateNewURLController);

URLRouter.get('/:userId',AuthenticationMiddleware,getAllUrlsFromUser)

module.exports = {
    URLRouter: URLRouter
}