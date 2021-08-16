const mongoose = require('mongoose')
const User = require('../../../Database/Models/User/User');
const Response = require('../../Helpers/Response');

async function getRoles(req,res){
   try{ 
        const users = await User.find({}, { password: 0 }).populate('role')

        if(users){
            Response(res, 200, {success:true, users:users})
        }else{
            Response(res, 400, {success:false, message:'Couldnt get users'})
        }
    }catch(err){
        Response(res, 500, {success:false, message:err.message})
    }
}

module.exports = getRoles