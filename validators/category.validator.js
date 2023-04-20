const Categories = require('../models/category.model');
const { userTypes } = require('../utils/constant');


const createCategoryValidator = async(req, res, next)=>{

    if(!req.body.name) {
        return res.status(400).send({message:"Category name is required"});
    }

    // if(!req.body.categoryId) {
    //     return res.status(400).send({message:"CategoryId is required"});
    // }

    var category = await Categories.findOne({name: req.body.name});

    if(category != null) {
        return res.status(400).send({message:"Failed, Category name is alredy exist"});
    }

    // category = await Categories.findOne({categoryId: req.body.categoryId});
    // if(category != null) {
    //     return res.status(400).send({message:"Failed, categoryId is alredy exist"});
    // }

    next();
}

const categoryIdValidator = async(req, res, next)=> {
    const category = await Categories.findById({_id:req.params.id})
    if(category == null) {
        return res.status(400).send({message:`Category is not present with ${req.params.id} id`});
    }
    next();
}

const updateCategoryValidator = async(req, res, next)=>{
    if(req.body.name) {
        let category = await Categories.findOne({name:req.body.name});

        if(category != null) {
            return res.status(400).send({message:`Failed, Category name ${req.body.name} is alredy exist`});
        }
    }

    if(req.body.categoryId) {
        let category = await Categories.findOne({name:req.body.categoryId});

        if(category != null) {
            return res.status(400).send({message:"Failed, categoryId is alredy exist"});
        }
    }
    next();
}

module.exports = {
    createCategoryValidator,
    categoryIdValidator,
    updateCategoryValidator
}