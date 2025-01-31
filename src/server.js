const express = require('express');
require('dotenv').config();
require('./db/connect');
const {v1Router} = require('./routers/v1/index');
const {RedirectURLController} = require('./controllers/urlController');
const {RequestLoggerMiddleware} = require('./middlewares/requestlogger.middleware');

const NODE_ENV = process.env.NODE_ENV

const PORT = process.env[`${NODE_ENV}_PORT`]

const app = express();
app.use(express.json());

app.use(RequestLoggerMiddleware);

app.use('/api/v1',v1Router);
app.get('/:keyId',RedirectURLController);

app.listen(PORT,()=>{
    console.log(`${NODE_ENV} Server is started on PORT - ${PORT}`)
})