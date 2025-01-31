const jwt = require('jsonwebtoken');
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET_KEY = process.env[`${NODE_ENV}_JWT_SECRET_KEY`]



const AuthenticationMiddleware = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];

        const tokenVerifyResult = await jwt.verify(token, JWT_SECRET_KEY);

        const { userId } = tokenVerifyResult

        req.userId = userId;

        next();

    } catch (error) {
        console.log(`Error in AuthenticationMiddleware with err : ${error}`);
        return res.status(401).json({
            success: false,
            message: "you are not allowed to send the request, Authentication failed"
        })
    }
}

module.exports = {
    AuthenticationMiddleware
};