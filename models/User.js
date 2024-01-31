const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{type:String,required : true,unique:true},
    email:{type:String,required : true,unique:true},
    password:{type:String,required:true},
    location:{type:String,required:false},
    isAdmin:{type:Boolean,default:false},
    isAgent:{type:Boolean,default:false},
    skills:{type:Array,default:false},
    profile:{type:String,default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw2C6VfZSj_8V3R5iZNsbNSZ&ust=1706431279592000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKD2p4SW_YMDFQAAAAAdAAAAABAE",
    required:true},
},{timestamps:true});
module.exports = mongoose.model("User",UserSchema);