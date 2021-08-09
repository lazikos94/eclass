const User = require('../../../Database/Models/User/User');
const Role = require('../../../Database/Models/Role/Role');

const Response = require('../../Helpers/Response');
const CryptoJS = require('crypto-js');
const jwt  = require('jsonwebtoken');
const {secret} = require('../../../config');

async function Register (req,res){
    try{
        const body = req.body;

        console.log(body)

        const existing_user =await User.findOne({email:body.email});
        
        if(existing_user){
            Response(res, 400, { error_message: `User Already Exists`, success:false });
        }else{   
            const newUser = new User({
                firstname:body.firstname,
                lastname:body.lastname,
                email:body.email,
                password:body.password,
                role:body.role
            });
            console.log(newUser);
            await newUser.save();
            Response(res, 201, { success: true, user: newUser.email, message:"User succefully registered"})
        }
    }catch(err){
        console.log(err)
        Response(res, 500, {success:false, error_message: err.message})
    }
}

module.exports = Register;