const { CheckEmailDomainIsPersonalOrNotUtil } = require('../utils/auth.utils');
const { isUserPresentUsingEmailService, CreateNewUserService } = require('../services/userService');
const { IsOrganizayionPresentUsingOrgDomainService, CreateNewOrganizationService } = require('../services/organizationService');
const bcrypt = require('bcrypt');

const SignupController = async (req, res) => {
    try {

        const { fullName, email, password } = req.body;

        if (!fullName) {
            return res.status(400).json({
                success: false,
                message: "fullName is required"
            })
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "password is required"
            })
        }

        // todo: if user is already present, then return error

        const isUserPresentUsingEmailServiceResult = isUserPresentUsingEmailService(email);

        if (isUserPresentUsingEmailServiceResult.success) {
            return res.status(400).json({
                success: false,
                message: "User is already present with this email"
            })
        }

        const emailDomain = email.split("@")[1];

        console.log(emailDomain);

        const CheckEmailDomainIsPersonalOrNotUtilResult = CheckEmailDomainIsPersonalOrNotUtil(emailDomain);

        if (CheckEmailDomainIsPersonalOrNotUtilResult.success) {
            // if email is personal
            res.status(200).json({
                success: true,
                message: "Email is Personal"
            })


        } else {
            // if email is business/professional

            const organizationDomain = emailDomain;

            const organizationName = organizationDomain.split(".")[0].toUpperCase();
            let organizationId

            const IsOrganizayionPresentUsingOrgDomainServiceResult = await IsOrganizayionPresentUsingOrgDomainService(organizationDomain);

            if (IsOrganizayionPresentUsingOrgDomainServiceResult.success) {
                organizationId = IsOrganizayionPresentUsingOrgDomainServiceResult.data._id;
            } else {
                const CreateNewOrganizationServiceResult = await CreateNewOrganizationService(organizationDomain, organizationName);
                if (!CreateNewOrganizationServiceResult.success) {
                    return res.status(400).json({
                        success: false,
                        message: "unable to create organizaion with name in SignupController"
                    })
                }
                organizationId = CreateNewOrganizationServiceResult.data._id;
            }

            const salt = await bcrypt.genSalt()
            const encryptedPassword = await bcrypt.hash(password, salt);

            const CreatedNewUserServiceResult = await CreateNewUserService(fullName, email, encryptedPassword, organizationId);

            if (!CreatedNewUserServiceResult) {
                return res.status(400).json({
                    success: false,
                    message: "unable to create user in SignupController"
                })
            }

            const { fullName: fullNameDB, email: emailDB, organizationId: organizationIdDB, _id: userId } = CreatedNewUserServiceResult.data

            return res.status(200).json({
                success: true,
                message: "user created successfully",
                data: {
                    fullName: fullNameDB,
                    email: emailDB,
                    organizationId: organizationIdDB,
                    userId: userId
                }
            });

        }


    } catch (error) {
        console.log(`error in SignupController with error :- ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }
}


const SigninController = async (req, res) => {
    try {

    } catch (error) {

    }
}


module.exports = {
    SignupController,
    SigninController
}