const mongoose = require('mongoose')
const Role = require('../../../Database/Models/Role/Role');
const Response = require('../../Helpers/Response');

async function getRoles(req,res){
   try{ 
        const roles = await Role.find({})

        if(roles){
            Response(res, 200, {success:true, roles:roles})
        }else{
            Response(res, 400, {success:false, message:'Couldnt get roles'})
        }
    }catch(err){
        Response(res, 500, {success:false, message:err.message})
    }
}

module.exports = getRoles