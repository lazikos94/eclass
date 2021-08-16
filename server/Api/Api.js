const express = require('express');
const cors = require('cors');
const {Login} = require('./Controllers/Auth');
const {CheckToken} = require('./Controllers/Auth');
const {Register} = require('./Controllers/Auth');
const {GetRoles} = require('./Controllers/Auth');
const {GetUsers} = require('./Controllers/Auth');
const {CreateClass,GetClass,GetSingleClass} = require('./Controllers/Class');
const api = express();

//user routes
api.post('/login',Login);
api.get('/auth',CheckToken);
api.post('/register',Register);
api.get('/getroles',GetRoles);
api.get('/users',GetUsers);

//class routes

api.get('/getclasses',GetClass);
api.post('/createclass',CreateClass);
api.get('/class/:id',GetSingleClass);

module.exports = api;