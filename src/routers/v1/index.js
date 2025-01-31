const express = require('express');
const {URLRouter} = require('./url.router');
const AuthRouter = require('./auth.router');
const v1Router = express.Router();

v1Router.use("/short-url",URLRouter);

v1Router.use('/auth',AuthRouter);

v1Router.use('/user/uls',URLRouter);

module.exports = {
    v1Router
}