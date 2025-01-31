const {generateUniqueIdforURLUtil} = require('../utils/url.utils');
const {
    CreateNewUrlService,
    GetURLDetailsUsingItsKeyIdService,
    UpdateTheClickedCountOfURLByOneUsing_IdService
} = require('../services/urlService');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const geoip = require('geoip-lite');

const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env[`${NODE_ENV}_PORT`]

const JWT_SECRET_KEY = process.env[`${NODE_ENV}_JWT_SECRET_KEY`]

const CreateNewURLController = async(req,res) => {
    try{

        const userId = req.userId;


        const {originalURL} = req.body;

        if(!originalURL){
            const err = new Error("originalURL is missing inside the body");
            err.statusCode = 400
            throw err
        }

        const keyId = generateUniqueIdforURLUtil(6);

        const CreateNewURLServiceResult = await CreateNewUrlService(originalURL, keyId, userId);

        if(!CreateNewURLServiceResult || !CreateNewURLServiceResult.success){
            const err = new Error('Unable to create new URL');
            err.statusCode = 500
            throw err
        }

        const {KeyId : keyIdFromDB} = CreateNewURLServiceResult.data;


        return res.status(200).json({
            success: true,
            message: "New url is created",
            redirect: `http://${NODE_ENV==="DEV" ? "localhost:" + PORT : req.host}/${keyIdFromDB}`
        })
        
        
    } catch(error){
        console.log(`error ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const RedirectURLController = async(req,res) => {
    try{

        const ip = req.ip;
        const geo = geoip.lookup(ip);

        const {country, region} = geo;



        const {keyId} = req.params
        if(!keyId){
            return res.status(400).json({
                success: false,
                message: "keyId is required"
            })
        }

        const GetURLDetailsUsingItsKeyIdServiceResult = await GetURLDetailsUsingItsKeyIdService(keyId);

        if(!GetURLDetailsUsingItsKeyIdServiceResult){
            return res.status(400).json({
                success: false,
                message: "Unable to fetch data from GetURLDetailsUsingItsKeyIdService"
            })
        }

        const {_id, originalURL, ClickedCount, createdAt} = GetURLDetailsUsingItsKeyIdServiceResult.data;

        if(ClickedCount > 10){
            return res.status(400).json({
                success: false,
                message: "You have reached the limit of 10 clicks"
            })
        }

        if(new Date().getTime()-createdAt > 7*24*60*60*1000){
            return res.status(400).json({
                success: false,
                message: "Your rediret URL is expired"
            })
        }

        const  UpdateTheClickedCountOfURLByOneUsing_IdServiceResult =  await UpdateTheClickedCountOfURLByOneUsing_IdService(_id,geo?.country,geo?.region);

        if(!UpdateTheClickedCountOfURLByOneUsing_IdServiceResult.success){
            return res.status(400).json({
                success: false,
                message: "error in updating clicked count and other things"
            })       
        }

        res.redirect(originalURL);

    } catch(error){
        console.log(`error in redirectURLController : ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = {
    CreateNewURLController,
    RedirectURLController
}


