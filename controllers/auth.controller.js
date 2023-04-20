const bcrypt = require('bcrypt');
const Users = require('../models/user.model');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');

exports.singUp = async (req, res)=>{
    try{
        const user = await Users.create({
            name:req.body.name,
            email:req.body.email,
            userId:req.body.userId,
            password:bcrypt.hashSync(req.body.password, 8),
            userType:req.body.userType
        }) 
    
        if(!user){
            return res.status(400).send({message:'Invalid error'})
        }
        return res.status(201).send(user);
    }
    catch(error) {
        return res.status(500).send({message:'Internal server error'});
    }
    
}

exports.signIn = async(req, res) =>{
    try{
        const user = await Users.findOne({
            userId:req.body.userId
        });

        if(user == null){
            return res.status(400).send({message:'Invalid userId'});
        }

        const password = bcrypt.compareSync(req.body.password, user.password);
        
        if(!password) {
            return res.status(400).send({message:'Invalid password'});
        }

        const token = jwt.sign({userId:user.userId,userType:user.userType},authConfig.secret,{expiresIn:86400});

        return res.status(201).send({
            id:user.id,
            accessToken: token
        });
    }
    catch(error){
        return res.status(500).send({message:'Internal server error'});
    }
}