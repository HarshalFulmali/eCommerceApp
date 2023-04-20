const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    // categoryId:{
    //     type:String,
    //     required: true
    // },
    createAt:{
        type:Date,
        required:true,
        default:()=> Date.now()
    }
});

module.exports = mongoose.model('Categories', categorySchema);