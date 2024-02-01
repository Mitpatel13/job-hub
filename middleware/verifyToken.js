const User = require('../models/User');
const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is missing.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SEC);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        req.user = user; // Set req.user with the user information
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Invalid token.' });
    }
};
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