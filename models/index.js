const mongoose = require('mongoose');
const config = require('../config.js');

mongoose.connect(config.dbUrl);
exports.User=mongoose.model('user',new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
}));

exports.Article= mongoose.model('article',new mongoose.Schema({
    //是一个对象ID类型，引用用户模型
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title:String,
    content:String,
    picture:String,//增加一张图片
    createAt:{type:Date,default:Date.now()}
}));