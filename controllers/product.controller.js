const Products = require('../models/product.model');

// for creating Product
exports.createProduct = async(req, res)=>{
    try{
        const product = await Products.create({
            name:req.body.name,
            categoryName: req.body.categoryName,
            cost: req.body.cost,
            description: req.body.description
        });

        return res.status(201).send(product)
    }
    catch(error) {
        return res.status(500).send({message:"Internal server error"+error});
    }
}


// for fetching all product
exports.getAllProducts = async(req, res)=> {
    try{
        const searchObj = {}
        if(req.query.name && req.query.categoryName) {
            searchObj.$and = [{name:req.query.name},{categoryName:req.query.categoryName}]
        }
        else if(req.query.name){
            searchObj.name = req.query.name
        }
        else if(req.query.categoryName) {
            searchObj.categoryName = req.query.categoryName
        }

        const products = await Products.find(searchObj);
        return res.status(200).send(products)
    }
    catch(error){
        return res.status(500).send({message:"Internal server error"});
    }
}

// fetching product by id
exports.getProductById = async(req, res)=>{
    try{
        const product = await Products.findOne({_id:req.params.id});
        if(product == null) {
            return res.status(400).send({message:`Product is not present with ${req.params.id}`});
        }
        return res.status(200).send(product); 
    }
    catch(error) {
        return res.status(500).send({message:"Internal server error"});
    }
}

// updating product by id
exports.updateProduct = async(req, res)=>{
    try{
        const savedProduct = await Products.findOne({_id:req.params.id});
        if(savedProduct == null) {
            return res.status(400).send({message:"Product id is not correct"});
        }
       
        savedProduct.name = req.body.name ? req.body.name : savedProduct.name
        savedProduct.categoryName = req.body.categoryName ? req.body.categoryName : savedProduct.categoryName       
        savedProduct.cost = req.body.cost ? req.body.cost : savedProduct.cost
        savedProduct.description = req.body.description ? req.body.description : savedProduct.description
        

        const updatedProduct  = await savedProduct.save();
        return res.status(201).send(updatedProduct);
    }
    catch(error){
        return res.status(500).send({message:"Internal server error"});
    }
}

// deleting product by id
exports.deleteProduct = async(req, res)=> {
    try{
        const product = await Products.findOne({_id:req.params.id});
        if(product == null) {
            return res.status(400).send({message:"Product id is not correct"});
        }

        await Products.deleteOne({_id:req.params.id})
        return res.status(201).send({message:`${product.name} product is deleted`});
    }
    catch(error) {
        return res.status(500).send({message:"Internal server error"});
    }
}