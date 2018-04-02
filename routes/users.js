var express = require('express');
let models =require('../models/index');
var router = express.Router();
const util = require('../util');

/* GET users listing.
 * 只要写后半段就可以了，不同path的全部内容 */
router.get('/reg', function(req, res, next) {
  res.render('user/reg',{title:'注册'});
});
router.post('/reg',(req,res,next)=>{
    let user=req.body;
    models.User.find({"username":user.username},(err,docs)=>{
        if(err){
            res.redirect('back');
        }else{
            if(docs.length>0){
                res.redirect('back');
            }else{
                if(user.password===user.repassword){
                    user.password=util.md5(user.password);
                    models.User.create(user,(err,doc)=>{
                        console.log(doc);
                        res.redirect('/users/login');
                    })
                }else{
                    res.redirect('back');
                }
            }
        }
    });
});
router.get('/login',(req,res,next)=>{
    res.render('user/login',{title:'登录'});
});
router.post('/login',(req,res,next)=>{
    let user=req.body;
    console.log('user',user);
    user.password=util.md5(user.password);
    models.User.findOne(user,(err,doc)=>{
        console.log(doc);
        if(err){
            res.redirect('back');
        }else{
            if(doc){
                res.redirect('/');
            }else{
                res.redirect('/users/login');
            }
        }
    })
});


router.get('/logout',(req,res,next)=>{
    res.render('index',{title:'登出'});
});
module.exports = router;
