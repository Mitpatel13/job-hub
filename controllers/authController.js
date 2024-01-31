const User = require("../models/User");
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser :async (req,res)=>{
        const newUser  = new User({
            username:req.body.username,
            password:CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString(),
            email:req.body.email,
        });
        try{
            const savedUser  = await newUser.save();
            res.status(200).send({s:0,m:"Registration Success",r:savedUser})
        }
        catch(e){
            res.status(500).send({m:e.message,s:1});
        }
    },
    loginUser :async(req,res)=>{
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({ m: "Invalid Credentials",s:1 });
            }
            
            const decryptPass = CryptoJs.AES.decrypt(user.password, process.env.SECRET);
            const depassword = decryptPass.toString(CryptoJs.enc.Utf8);
    
            if (depassword !== req.body.password) {
                return res.status(401).json({ m: "Invalid password" ,s:1});
            }
            const {password,__v,createdAt,...others} = user._doc;
            const userToken = jwt.sign({
                id:user._id,isAdmin:user.isAdmin,isAgent:user.isAgent
            },process.env.JWT_SEC,{expiresIn:"21d"});
    
            res.status(200).json({ s:0,m: "Login successful", r:{...others,userToken} });
        } catch (e) {
            console.error(e);
            res.status(500).json({ m:e.message,s:1 });
        }
        }
}