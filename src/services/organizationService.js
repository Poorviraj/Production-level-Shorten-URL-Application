const ORGANIZATIONSModel = require('../models/organizations.model');

const IsOrganizayionPresentUsingOrgDomainService = async(organizationDomain) => {
    try{
        const organization = await ORGANIZATIONSModel.findOne({domain: organizationDomain});
        if(organization){
            return {
                success: true,
                data: organization
            }
        } else{
            return {
                success: false,
                message: "did not get data in IsOrganizayionPresentUsingOrgDomainService "
            }
        }
    } catch(error){
        console.log(`Error in IsOrganizayionPresentUsingOrgDomainService with err : ${error}`);
        return {
            success: false
        }
    }
}

const CreateNewOrganizationService = async (organizationDoamin,organizationName) => {
    try{

        const organizaionDetails = {
            name: organizationName
        }

        if(organizationDoamin){
            organizaionDetails.domain = organizationDoamin
        }

        const orgaization = await ORGANIZATIONSModel.create(organizaionDetails);

        if(orgaization){
            return {
                success: true,
                data: orgaization
            }
        }

        return { 
            success: false,
            message: "did not get data in CreateNewOrganizationService "
        }

    } catch(error){
        console.log(`Error in CreateNewOrganizationService with err : ${error}`);
        return response.status(500).json({
            success: false,
            message: "Error in CreateNewOrganizationService",
            error: error.message
        })
    }
}

module.exports = {
    IsOrganizayionPresentUsingOrgDomainService,
    CreateNewOrganizationService
};