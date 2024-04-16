const jwt = require('jsonwebtoken');

require('dotenv').config()

async function auth(req,res,next){
    try {
        
        const token=req.cookies.token
        
        
        if(!token){
            res.locals.user=null

            next()
        }
        else{
            const payload=jwt.verify(token,process.env.JWT_SECRET)

            if(!payload){
                res.locals.user=null

                next()
            }
            else{
                req.token=payload

                next()
            }
        }
    } catch (error) {
        console.log("internal server error "+error);
        res.locals.user=null
        next()
    }
}

module.exports = auth;