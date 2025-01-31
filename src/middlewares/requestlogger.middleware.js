

const RequestLoggerMiddleware = async(req,res, next) => {
    try{

        const httpMethod = req.method;
        const ip = req.ip;
        const url = req.url;

        console.log(`${httpMethod} - ${ip} - ${url} - ${new Date()}`);

        next();

    } catch(error){
        console.log(`Error in RequestLoggerMiddleware with err : ${error}`);
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    RequestLoggerMiddleware
}