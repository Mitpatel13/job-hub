const User = require("../models/User");
const CryptoJs = require('crypto-js');

module.exports = {
    updateUser : async (req,res)=>{
        if(req.body.password){
            req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }
        try{
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                $set:req.body
            },{new:true});
            const {password,__v,createdAt,...others} = updateUser._doc;
            res.status(200).send({...others});
            

        }catch(e){
            res.status(500).send({"msg":e.message})
        }

    },

    // DELETE USER

    deleteUser : async(req,res)=>{
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send({"msg":"Account deleted successfully."})
        }
        catch(e){
            res.status(500).send({"msg":e.message})
        }
    },

    // GET USER
    getUser : async(req,res)=>{
        try{
            const user = await User.findById(req.params.id);
            const {createdAt , __v, password,...others} = user._doc;
            const userToken = req.headers['token'].split(" ")[1];
            res.status(200).send({s:0,m:"User data get successfully.",r:{...others,userToken}});
        }
        catch(e){
            res.status(500).send({s:1,'m':e.message})
        }
    },
    // GET ALL USER 
    getAllUser :async(req,res)=>{
        try{
            const allUser = await User.find();
            res.status(200).send({'msg':'All user get successfully.',allUser});
        }
        catch(e){
            res.status(500).send({'msg':e.message})
        }
    }
}

