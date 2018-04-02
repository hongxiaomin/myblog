const mongoose = require('mongoose');
const config = require('../config.js');

mongoose.connect(config.dbUrl);
exports.User=mongoose.model('user',new mongoose.Schema({
    username:String,
    password:String,
    email:String
}));
