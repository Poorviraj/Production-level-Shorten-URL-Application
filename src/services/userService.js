const USERSModel = require('../models/users.model');

const isUserPresentUsingEmailService =  async (email) => {
    try{

        const user = await USERSModel.findOne({email});

        if(user){
            return {
                success: true,
                data: user
            }
        } else{
            return {
                success: false,
                message: "Error in isUserPresentUsingEmailService"
            }
        }


    } catch(err){
        console.log(`error in isUserPresentUsingEmailService with err : ${err}`)
    }
} 

const CreateNewUserService = async(fullName, email, encryptedPassword, organizationId) => {
    try{

        const user = await USERSModel.create({fullName : fullName, email : email, password : encryptedPassword, organizationId : organizationId})

        if(user){
            return {
                success : true,
                data : user
            }
        }else{
            return {
                success : false,
                message: "User not created there is an error in CreateNewUserService "
            }
        }

    } catch(error){
        console.log(`Error in CreateNewUserService with err : ${error}`)
        return {
            success : false
        }
    }
}

module.exports = {
    isUserPresentUsingEmailService,
    CreateNewUserService
}