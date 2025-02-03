const jwt = require('jsonwebtoken');
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET_KEY = process.env[`${NODE_ENV}_JWT_SECRET_KEY`]



const AuthenticationMiddleware = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];

        const tokenVerifyResult = await jwt.verify(token, JWT_SECRET_KEY);

        const { userId, role } = tokenVerifyResult

        req.userId = userId;
        req.role = role;
        next();

    } catch (error) {
        console.log(`Error in AuthenticationMiddleware with err : ${error}`);
        return res.status(401).json({
            success: false,
            message: "you are not allowed to send the request, Authentication failed"
        })
    }
}

const AuthorizationMiddleware = (role) => {
    return async (req, res, next) => {
        try {
            if (req.role === role) {
                next()
            } else {
                return res.status(400).json({
                    success: false,
                    message: "unauthorized access"
                })
            }
        } catch (error) {
            console.log(`Error in AuthorizationMiddleware with err : ${error}`);
            return res.status(401).json({
                success: false,
                message: "you are not allowed to send the request, Authentication failed"
            })
        }
    }
}


module.exports = {
    AuthenticationMiddleware,
    AuthorizationMiddleware
};