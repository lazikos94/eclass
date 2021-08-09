const mongoose = require('mongoose');
const _id = mongoose.Schema.Types.ObjectId;

const ClassSchema = new mongoose.Schema({
    name:{type:String,required:true},
    teachers:[{type:_id,required:true,ref:'User'}],
    students:[{type:_id,required:true,ref:'User'}]
})

const Class = mongoose.model('Class',ClassSchema);

module.exports = Class
