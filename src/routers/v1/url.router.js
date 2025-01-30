const express = require('express');

const URLRouter = express.Router();

const {CreateNewURLController} = require('./../../controllers/urlController');

URLRouter.post("/new",CreateNewURLController);

module.exports = {
    URLRouter: URLRouter
}