const Carts = require('../models/cart.model')
const Products = require('../models/product.model');

exports.createCart = async(req, res)=>{
    try{
        const userId = req.userId;
        const cart = await Carts.create({
            userId: userId
        });
        return res.status(201).send(cart);
    }
    catch(error) {
        return res.status(500).send({message:'Internal server error: '+error});
    }

}

exports.getCart = async(req, res)=>{
    try{
        const userId = req.params.id;
        const cart = await Carts.findOne({_id:userId});
        return res.status(200).send(cart);
    }
    catch(error) {
        return res.status(500).send({message:'Internal server error: '+error});
    }
}

exports.updateCarts = async(req, res)=> {
    try{
        const savedCart = await Carts.findOne({_id:req.params.id});
        if(savedCart == null) {
            return res.status(400).send({message:'Cart id is not valid'});
        }

        const productNames = req.body.product;
        const products = await Products.find({name:productNames})
        const totalCost = products.reduce((acc,product)=>{
            return acc+product.cost;
        },0);

        savedCart.products = products ? products : savedCart.products;
        savedCart.totalCost = totalCost ? totalCost : savedCart.totalCost;

        const updatedCart = await savedCart.save()
        return res.status(201).send(updatedCart);
    }
    catch(error) {
        return res.status(500).send({message:'Internal server error: '+error});
    }
}