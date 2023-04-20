const Products = require('../models/product.model');
const Categories = require('../models/category.model');

const createProductValidator = async(req, res, next)=> {
    if(!req.body.name){
        return res.status(400).send({message:"Product name is required"});
    }

    if(!req.body.categoryName){
        return res.status(400).send({message:"category name is required"})
    }

    const categories = await Categories.find();
    const availableCategories = [];
    categories.forEach((category)=> availableCategories.push(category.name));
    const requestedCategory = req.body.categoryName;

    if(requestedCategory && ! availableCategories.includes(requestedCategory)) {
        return res.status(400).send({message:`categoryName should be among ${availableCategories}`})
    }
    next();
}

const updateProductValidator = async(req, res, next)=>{
    const product = await Products.findOne({name: req.body.name});
    if(product != null) {
        return res.status(400).send({message:"Product name is alredy exist"})
    }

    const categories = await Categories.find();
    const availableCategories = [];
    categories.forEach((category)=> availableCategories.push(category.name));
    const requestedCategory = req.body.categoryName;

    if(requestedCategory && ! availableCategories.includes(requestedCategory)) {
        return res.status(400).send({message:`categoryName should be among ${availableCategories}`})
    }
    next();
}

module.exports = {
    createProductValidator,
    updateProductValidator
}