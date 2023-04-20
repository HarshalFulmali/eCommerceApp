const Products = require('../models/product.model');
const Carts = require('../models/cart.model');


const checkForItemsName = async(req, res, next)=>{
    var goToNext = true;
    if(req.body.product) {
        const products = await Products.find({name:req.body.product});

        let productObj = {};
        for(let product of products) {
            let name = product.name;
            productObj[name]=1;
        }

        let requestedProducts = req.body.product

        requestedProducts.forEach((requestedProduct) =>{
            if(!productObj[requestedProduct]) {
                goToNext = false
                return res.status(400).send({message:`Product is not present with ${requestedProduct} name`});
            }
        })
    }
    if(goToNext){
        next();
    }
    
}

const checkCartId = async(req, res, next)=>{
    const cart = await Carts.findById({_id:req.params.id});

    if(cart == null) {
        return res.status(400).send({message:`Cart is not present with ${req.params.id} id`})
    }
    next()
}

const checkAuthUserCart = async(req,res,next) =>{
    const userId = req.userId;
    const cartId = req.params.id;

    const cart = await Carts.findById({_id:cartId});
    if(userId != cart.userId){
        return res.status(401).send({message:"User can't access this cart"});
    }
    next();
}

module.exports = {
    checkForItemsName,
    checkCartId,
    checkAuthUserCart
}