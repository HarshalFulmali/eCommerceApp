const Users = require('../models/user.model');
const { userTypes } = require('../utils/constant');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config')

const signUpValidators = async(req, res, next) =>{
    if(!req.body.name){
        return res.status(400).send({message:'name is required'})
    }
    if(!req.body.userId){
        return res.status(400).send({message:'userId is required'})
    }
    if(!req.body.email){
        return res.status(400).send({message:'email is required'})
    }
    if(!req.body.password){
        return res.status(400).send({message:'password is required'})
    }

    var user = await Users.findOne({userId:req.body.userId});
    if(user != null) {
        return res.status(400).send({message:'Failed! userId already exists'})
    }

    user = await Users.findOne({email:req.body.email});

    if(user != null) {
        return res.status(400).send({message:'Failed! email already exists'});
    }

    const userType = req.body.userType;
    const availableUserTypes = [userTypes.admin, userTypes.customer];

    if(userType && !availableUserTypes.includes(userType)) {
        return res.status(400).send({message:`userType should be among ${availableUserTypes}`});
    }


    next();
};

const signInValidator = (req,res,next) =>{
    if(!req.body.userId){
        return res.status(400).send({message:'userId is required'})
    }
    if(!req.body.password){
        return res.status(400).send({message:'password is required'})
    }
    next();
};

const verifyJWT = (req, res, next)=>{
    const token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({message:"No token provided"});
    }

    jwt.verify(token,authConfig.secret,(error,payload)=>{
        if(error){
            return res.status(403).send({message:"Invalid JWT token"});
        }

        req.userId = payload.userId;
        req.userType = payload.userType;

        next();
    })
    
}

const isAdmin = (req, res, next)=>{
    const userType = req.userType;

    if(userType != userTypes.admin) {
        return res.status(401).send({message:"User is not authorized"});
    }
    next();
}



module.exports = {
    signUpValidators,
    signInValidator,
    verifyJWT,
    isAdmin
}