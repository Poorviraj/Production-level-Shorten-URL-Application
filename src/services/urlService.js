const URLSModel = require('./../models/urls.model')


async function CreateNewUrlService(originalURL, keyId, userId){
    try{

        // console.log("success here1");
        const result = await URLSModel.create({
            "originalURL": originalURL,
            "KeyId": keyId,
            "userId": userId
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

async function UpdateTheClickedCountOfURLByOneUsing_IdService(mongoId,country,region){
    try{
        const result = await URLSModel.findById(mongoId);

        
        result.ClickedCount = result.ClickedCount + 1;

        result.openedAtTimestamp = result.openedAtTimestamp.push(new Date().getDate());


        result.oprnedAtLocation = result.oprnedAtLocation.push(`${country} - ${region}`);
        
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

async function GetURLDetailsUsingItsUserIdService(userId){
    try{

        const URLDetails = await URLSModel.find({userId: userId})

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

module.exports = {
    CreateNewUrlService,
    GetURLDetailsUsingItsKeyIdService,
    UpdateTheClickedCountOfURLByOneUsing_IdService,
    GetURLDetailsUsingItsUserIdService
};