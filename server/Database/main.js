const mongoose = require('mongoose');
const Role = require('../Database/Models/Role/Role');
const User = require('../Database/Models/User/User');

class Database {
    constructor(url) {
        this.url = url
    }

    async db_connect() {
        const db = await mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log('DB connected');


    }

}

module.exports = Database;