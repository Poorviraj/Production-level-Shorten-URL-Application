const { CheckEmailDomainIsPersonalOrNotUtil } = require('../utils/auth.utils');
const { isUserPresentUsingEmailService, CreateNewUserService } = require('../services/userService');
const { IsOrganizayionPresentUsingOrgDomainService, CreateNewOrganizationService } = require('../services/organizationService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;

const JWT_SECRET_KEY = process.env[`${NODE_ENV}_JWT_SECRET_KEY`]

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
            let organizationRole = "ORG_MEMBER"

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
                organizationRole = "ORG_ADMIN"
            }

            const salt = await bcrypt.genSalt()
            const encryptedPassword = await bcrypt.hash(password, salt);

            const CreatedNewUserServiceResult = await CreateNewUserService(fullName, email, encryptedPassword, organizationId,organizationRole);

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
        const {email, password} = req.body;

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

        const isUserPresentUsingEmailServiceResult = await isUserPresentUsingEmailService(email);

        if (!isUserPresentUsingEmailServiceResult.success) {
            return res.status(400).json({
                success: false,
                message: "User is not present with this email, Invalid Email"
            })
        }

        const {fullName, email: emailInDB, password: passwordInDB, organizationId, _id, role} = isUserPresentUsingEmailServiceResult.data;

        const passwordCheck = await bcrypt.compare(password,passwordInDB);

        if(!passwordCheck){
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }

        // generate token for the user, and return back the token to the user

        const payload = {
            userId: _id,
            role: role
        }

        const token = await jwt.sign(payload,JWT_SECRET_KEY, {
            expiresIn: '1h'
        })

        return res.status(200).json({
            success: true,
            message: "User Signed In Successfully",
            token: token
        })

    } catch (error) {
        console.log(`error in SigninController with error :- ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }
}


module.exports = {
    SignupController,
    SigninController
}