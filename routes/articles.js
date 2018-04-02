var express = require('express');
const auth = require('../middleware/auth');
const models = require('../models/index');

var multer  = require('multer');
//指定存储目录和文件名
var storage = multer.diskStorage({
    //目标路径
    destination: function (req, file, cb) {
        cb(null, '../public/uploads')
    },
    //文件名
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now()+'.'+file.mimetype.slice(file.mimetype.indexOf('/')+1));
    }
});

var upload = multer({ storage: storage });

var router = express.Router();

/* GET users listing.
 * 只要写后半段就可以了，不同path的全部内容 */
router.get('/post',auth.checkLogin, function(req, res, next) {
    res.render('article/add',{title:'发表文章'});
});

router.post('/post',auth.checkLogin,upload.single('picture'),(req,res,next)=>{
    var article = req.body;
    console.log(req.file);
    if(req.file){
        article.picture='/uploads/'+req.file.filename;
    }
    //把当前登录的用户的ID赋给user
    article.user = req.session.user._id;
    models.Article.create(article,(err,doc)=>{
        if(err){
            req.flash('error','文章发表失败');
        }else{
            req.flash('success','文章发表成功');
            res.redirect('/');
        }
    })
});
module.exports = router;
