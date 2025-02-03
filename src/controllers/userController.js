
const {findUserByItsUserId,deleteUserByUserIdService} = require('../services/userService');
const {GetURLDetailsUsingItsUserIdService} = require('../services/urlService');


const getAllUrlsFromUser = async(req,res) => {
    try{
        const {userId} = req.params;

        if(!userId){
            return res.status(400).json({
                message: "User ID is required",
                success: false
            })
        }

        const result = await findUserByItsUserId(userId);

        if(!result.success){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        const getAllUrls = await GetURLDetailsUsingItsUserIdService(userId);

        if(!getAllUrls.success){
            return res.status(404).json({
                message: "No URLs found",
                success: false
            })
        }

        const userData = getAllUrls.data.length;

        if(userData == 0){
            return res.status(404).json({
                message: "No URLs found",
                success: true
            })
        }

        return res.status(200).json({
            success: true,
            message: `${getAllUrls.data.length} url found `,
            data: getAllUrls.data
        })


    } catch(error){
        console.log(`Error in getAllUrlsFromUser with err : ${error}`);
        return response.status(500).json({
            success: false,
            message: "Internal server Error in getAllUrlsFromUser",
            error: error.message
        })
    }
}

const DeleteUserByUserIdController = async(req,res) => {
    try{

        const {userId: userIdToDelete} = req.params

        const AdminUserId = req.userId
        
        const organizationIdOfAdmin = (await findUserByItsUserId(AdminUserId)).data.organizationId


        const organizationIdOfUerToDelete = (await findUserByItsUserId(userIdToDelete)).data.organizationId

        if(!organizationIdOfAdmin.equals(organizationIdOfUerToDelete)){
            return res.status(403).json({
                message: "You are not authorized to delete this user",
                success: false
            })
        }

        const deleteUserByUserIdServiceResult = await deleteUserByUserIdService(userIdToDelete);

        if(!deleteUserByUserIdServiceResult){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: `User with ${userIdToDelete} deleted successfully`,
        })


    } catch(error){
        console.log(`Error in DeleteUserByUserIdController with err : ${error}`);
        return response.status(500).json({
            success: false,
            message: "Internal server Error in DeleteUserByUserIdController",
            error: error.message
        })
    }
}

module.exports = {
    getAllUrlsFromUser,
    DeleteUserByUserIdController
}