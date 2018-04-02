var express = require('express');
const models = require('../models/index');
const markdown = require('markdown').markdown;
//调用Router方法生成一个路由实例
var router = express.Router();

/* GET home page.
* path 指定路径
* listener 指定回调监听函数*/
router.get('/', function(req, res, next) {
  //先查找 然后把user字符串转成user对象
    models.Article.find({}).populate('user').exec((err,docs)=>{
      if(err){
        req.flash('error','获取文章列表失败');
      }else{
        console.log(docs);
        docs.forEach((article)=>{
            article.content=markdown.toHTML(article.content);
        });
          res.render('index', { title: '首页',articles:docs});
      }
    });

});

module.exports = router;
