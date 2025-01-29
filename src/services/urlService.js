const URLSModel = require('./../models/urls.model')


async function CreateNewUrlService(originalURL, keyId){
    try{

        // console.log("success here1");
        const result = await URLSModel.create({
            "originalURL": originalURL,
            "KeyId": keyId
        })
        // console.log("success here");

        if(!result){
            throw new Error("unable to call URLSModel.create()")
        }
        return {
            success: true,
            data: result
        }

    } catch(err){
        console.log(`Error in CreateNewUrlService for originalUrl : ${originalURL} & keyId : ${keyId}`);
        return {
            success: false
        }
    }
}

async function GetURLDetailsUsingItsKeyIdService(keyId){
    try{

        const URLDetails = await URLSModel.findOne({KeyId: keyId})

        if(!URLDetails) {
            throw new Error(`unable to fetch details from this ${keyId}`);
        }

        return {
            success: true,
            data: URLDetails
        }

    } catch(err){
        console.log(`Error in GetURLDetailsUsingItsKeyIdService with err : ${err}`);
        return {
            success: false
        }
    }
}

async function UpdateTheClickedCountOfURLByOneUsing_IdService(mongoId){
    try{
        const result = await URLSModel.findById(mongoId);

        
        result.ClickedCount = result.ClickedCount + 1;
        
        console.log(result.ClickedCount);
        
        await result.save();

        return {
            success: true
        }
    } catch(error){
        console.log(`Error in UpdateTheClickedCountOfURLByOneUsingKeyIdService with err : ${error}`);
        return {
            success: false
        }
    }
}

module.exports = {
    CreateNewUrlService,
    GetURLDetailsUsingItsKeyIdService,
    UpdateTheClickedCountOfURLByOneUsing_IdService
};