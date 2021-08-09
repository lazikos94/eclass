const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _id = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    firstname: {type:String,required:true},
    lastname: {type:String, required:true},
    password: {type:String, required:true},
    dateOfBirth: {type:Date, required:false},
    email:{type: String, trim: true, required:true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address'] },
    gender:{type:String, required:false},
    city:{type:String,required:false},
    address: {type:String, required:false},
    studentDetails:{type:String,required:false},
    studentPhoneNumber:{type:Number,required:false},
    parentPhoneNumber:{type:Number,required:false},
    parentFirstName:{type:String, required:false},
    parentLastName:{type:String, required:false},
    parentEmail:{type: String, trim: false, required:false, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address'] },
    schoolClass: {type:String,required:false},
    teacherPhoneNumber:{type:Number,required:false},
    role: { type: _id, required: true, ref: "Role" }, 
},{
    timestamps:true
})

UserSchema.pre('save', function(next){
    var user = this;

     if (!user.isModified('password')) return next();

     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);

         bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);

             user.password = hash;
             next();
         });
     });
})

const User = mongoose.model('User', UserSchema);

module.exports = User;