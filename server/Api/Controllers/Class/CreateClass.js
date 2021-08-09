const Class = require('../../../Database/Models/Class/Class');

const Response = require('../../Helpers/Response');

async function CreateClass(req,res){
    try{
        const body = req.body;
        
        console.log(body)

        if(body){
            const newClass = new Class({
                name:body.name,
                teachers:body.teacher,
                students:body.students
            });
            await newClass.save();
            console.log(newClass);
            Response(res, 200, {success: true, class: newClass, message:"Class succefully create"});
        }else{
            Response(res, 400, {error_message:"No body", success:false});
        }
    }catch(err){
        console.log(err)
        Response(res,500,{success:false,error_message:err.message});
    }
}

module.exports = CreateClass;