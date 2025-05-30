const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    googleId: String,      
    provider: String,       
    photo: String
});

module.exports=mongoose.model("User",UserSchema)