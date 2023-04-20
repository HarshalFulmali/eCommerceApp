const mongoose = require('mongoose');
const {userTypes} = require('../utils/constant')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    userId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        default:userTypes.customer
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>Date.now()
    }
});

module.exports = mongoose.model("Users", userSchema);