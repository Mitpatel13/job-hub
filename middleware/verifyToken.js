const User = require('../models/User');
const jwt = require("jsonwebtoken");
const verifyToken = async(req,res,next)=>{
    try{
        var authHeader= req.headers['token'];
        if(authHeader){
            const token = authHeader.split(" ")[1];
            jwt.verify(token,process.env.JWT_SEC,async(error,user)=>{
                if(error) res.status(403).send({"msg":"Invalid token"});
                req.user = user;
                next();
            })
        }
        else{
            return res.status(401).send({"msg":"You are not authenticated"})
        }
    }
    catch(e){
        res.status(500).send({"msg":e.message})
    }
}
const verifyAndAuthorization = async (req,res,next)=>{
    try{
        verifyToken(req,res,()=>{if(req.user.id === req.params.id){
            next();
        }
        else{
            return res.status(403).send({"msg":"You are restricted from performing this operation"})
        }})
        
    }catch(e){
        res.status(500).send({"msg":e.message})
    }
}
const verifyAdmin = async (req,res,next)=>{
    try{
        verifyToken(req,res,()=>{
            if(req.user.isAdmin){
                next();
            }
        })
    }catch(e){
        res.status(500).send({"msg":"You are restricted from performing this operation"})
    }
    
}
module.exports = {verifyToken,verifyAndAuthorization,verifyAdmin}