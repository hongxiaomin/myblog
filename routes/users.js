var express = require('express');
let models =require('../models/index');
var router = express.Router();
const auth = require('../middleware/auth');
const util = require('../util');

/* GET users listing.
 * 只要写后半段就可以了，不同path的全部内容 */
router.get('/reg',auth.checkNotLogin, function(req, res, next) {
  res.render('user/reg',{title:'注册'});
});
router.post('/reg',auth.checkNotLogin,(req,res,next)=>{
    let user=req.body;
    models.User.find({"username":user.username},(err,docs)=>{
        if(err){
            req.flash('error','用户注册失败！');
            res.redirect('back');
        }else{
            if(docs.length>0){
                req.flash('error','此用户名已存在，注册失败！');
                res.redirect('back');
            }else{
                if(user.password===user.repassword){
                    user.password=util.md5(user.password);
                    //增加一个用户头像
                    user.avatar = 'https://secure.gravatar.com/avatar/'+util.md5(user.email)+'?s=64';
                    models.User.create(user,(err,doc)=>{
                        console.log(doc);
                        req.flash('success','注册成功！');
                        res.redirect('/users/login');
                    })
                }else{
                    req.flash('error','两次输入的密码不一致，注册失败！');
                    res.redirect('back');
                }
            }
        }
    });
});
router.get('/login',auth.checkNotLogin,(req,res,next)=>{
    res.render('user/login',{title:'登录'});
});
router.post('/login',auth.checkNotLogin,(req,res,next)=>{
    let user=req.body;
    console.log('user',user);
    user.password=util.md5(user.password);
    models.User.findOne(user,(err,doc)=>{
        console.log(doc);
        if(err){
            req.flash('error','用户登录失败！');
            res.redirect('back');
        }else{
            if(doc){
                //如果登录成功后把查询到的user用户赋给session的user属性
                req.session.user=doc;
                req.flash('success','用户登录成功！');
                res.redirect('/');
            }else{
                req.flash('error','用户登录失败！');
                res.redirect('/users/login');
            }
        }
    })
});


router.get('/logout',auth.checkLogin,(req,res,next)=>{
    req.session.user=null;
    req.flash('success','用户退出成功！');
    res.redirect('/');
});
module.exports = router;
