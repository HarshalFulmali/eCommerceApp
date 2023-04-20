const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    categoryName:{
        type:String,
        required: true
    },
    cost:{
        type:Number,
        required: true,
        default:0.0
    },
    description:{
        type:String,
        required: true 
    },
    createdAt:{
        type:Date,
        immutable: true,
        default:()=>Date.now()
    }
});

module.exports = mongoose.model("Products",productSchema);