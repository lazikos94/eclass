const Class = require('../../../Database/Models/Class/Class');

const Response = require('../../Helpers/Response');

async function GetClass(req,res){
    try{
        
        const classes = await Class.find({}).populate('teachers',{'password':0}).populate('students',{'password':0})
        console.log(classes);
        if(classes){
            Response(res, 200, {success: true, classes: classes, message:"Classes got"});

        }else{
            Response(res, 400, {success: false, message:"No class"});
        }
        
    }catch(err){
        console.log(err)
        Response(res,500,{success:false,error_message:err.message});
    }
}

async function GetSingleClass(req,res){
    try {
        console.log(req.params)
        const singleClass = await Class.findOne({_id:req.params.id}).populate('teachers',{'password':0}).populate('students',{'password':0});
        console.log(singleClass)
        if(singleClass){
            Response(res, 200, {success: true, classes: singleClass, message:"Class got"});

        }else{
            Response(res, 400, {success: true, message:"No class"});

        }

    } catch (err) {
        console.log(err)
        Response(res,500,{success:false,error_message:err.message});
    }
}
module.exports = {GetClass,GetSingleClass};