const mongoose = require('mongoose');
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV

mongoose.connect(process.env[`${NODE_ENV}_MONGODB_URL`]).then(()=>{
    console.log(`Connected to ${NODE_ENV} MongoDB`);
}).catch((error)=>{
    console.log(`Error while connecting with ${NODE_ENV} MongoDB - ${error}`);
})