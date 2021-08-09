const express = require('express');
const cors = require('cors');
const {Login} = require('./Controllers/Auth');
const {CheckToken} = require('./Controllers/Auth');
const {Register} = require('./Controllers/Auth');
const {GetRoles} = require('./Controllers/Auth');
const api = express();

//user routes
api.post('/login',Login);
api.get('/auth',CheckToken);
api.post('/register',Register);
api.get('/getroles',GetRoles);

//class routes

api.get('/getclasses',)


module.exports = api