const Categories = require('../models/category.model');


// creating category
exports.create = async (req, res) =>{
    try{
        const category = await Categories.create({
            name: req.body.name
            // categoryId: req.body.categoryId
        });

        if(!category) {
            return res.status(400).send({message:"Invalid category"});
        }

        res.status(201).send(category);
    }
    catch(error) {
        return res.status(500).send({message:"Internal server error"});
    }
}

// fetching all category
exports.getAllCategories = async(req, res)=> {
    try{
        let serchObj = {};
        if(req.query.name) {
            serchObj.name = req.query.name
        }
        const categories = await Categories.find(serchObj);

        return res.status(200).send(categories);

    }
    catch(error) {
        return res.status(500).send({message:"Internal server error"});
    }
}

// fetching category by id
exports.getCategoryById = async(req, res)=>{
    try{
        const category = await Categories.findOne({_id:req.params.id});
        if(category == null) {
            return res.status(400).send({message:"Category id is not correct"});
        }
        return res.status(200).send(category);
    }
    catch(error) {
        return res.status(500).send({message:"Internal server error"});
    }
}


// updating category
exports.updateCategory = async(req, res)=> {
    try{
        const savedCategory = await Categories.findOne({_id:req.params.id});
        if(savedCategory == null) {
            return res.status(400).send({message:"Category id is not correct"});
        }

        if(req.body.name) {
            savedCategory.name = req.body.name
        }

        // if(req.body.categoryId) {
        //     savedCategory.categoryId = req.body.categoryId
        // }

        const updateCategory = await savedCategory.save();

        return res.status(201).send(updateCategory);

    }
    catch(error) {
        return res.status(500).send({message:"Internal server error"});
    }
}


// deleting category
exports.deleteCategory = async(req, res)=>{
    try{
        // if(! req.params.id) {
        //     return res.status(400).send({message:"Id is not provided"});
        // }
        const category = await Categories.findOne({_id:req.params.id});
        if(category == null) {
            return res.status(400).send({message:"Category id is not correct"});
        }

        await Categories.deleteOne({_id:req.params.id});
        return res.status(201).send({message:`${category.name} Category deleted successfully`});
    }
    catch(error) {
        return res.status(500).send({message:"Internal server error"});
    }
}