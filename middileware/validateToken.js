const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT,async (err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error("user is not authorised");
            }
            req.user = decoded.user;
            next();
        })
    }else {
        res.status(401);
        throw new Error("Authorization header is missing or invalid");
    }
    
})


module.exports = validateToken;