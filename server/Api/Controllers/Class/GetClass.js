const Class = require('../../../Database/Models/Class/Class');

const Response = require('../../Helpers/Response');

async function CreateClass(req,res){
    try{
        
        const newClass = new Class({
            name:body.name,
            teachers:body.teacher,
            students:body.students
        });
        await newClass.save();
        console.log(newClass);
        Response(res, 200, {success: true, class: newClass, message:"Class succefully create"});
        
    }catch(err){
        console.log(err)
        Response(res,500,{success:false,error_message:err.message});
    }
}

module.exports = CreateClass;