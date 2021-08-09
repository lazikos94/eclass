const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {type:String, required:true},
    roleType: {type:String, required:true, default:'student',enum:['student','teacher','admin']},
    description: {type:String,required:false},
})

const Role = mongoose.model('Role',RoleSchema);

module.exports = Role;