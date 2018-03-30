var express = require('express');
var router = express.Router();

/* GET users listing.
 * 只要写后半段就可以了，不同path的全部内容 */
router.get('/reg', function(req, res, next) {
  res.render('index',{title:'注册'});
});

router.get('/login',(req,res,next)=>{
    res.render('index',{title:'登录'});
});

router.get('/logout',(req,res,next)=>{
    res.render('index',{title:'登出'});
});
module.exports = router;
