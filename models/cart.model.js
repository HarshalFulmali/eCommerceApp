const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:[
        {
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
            }
        }
    ],
    totalCost:{
        type:Number,
        required: true,
        default:0
    }
})

module.exports = mongoose.model("Carts", cartSchema);