var express = require('express');
const models = require('../models/index');
const markdown = require('markdown').markdown;
//调用Router方法生成一个路由实例
var router = express.Router();

/* GET home page.
* path 指定路径
* listener 指定回调监听函数*/
/*
* 分页 传参 当前页码 每页条数
* 结果 当前页的数据 一共多少页 当前页码 每页的条数*/
router.get('/', function(req, res, next) {
    console.log(req.query);
    let keyword = req.query.keyword;
    let reg=new RegExp(keyword,'i');
    let pageNum = parseInt(req.query.pageNum)||1;//当前页码
    let pageSize=parseInt(req.query.pageSize)||5;//一页有多少条数据
    let queryObj={};
    if(keyword){
        let queryArr=[{"title":reg},{"content":reg}];
        queryObj={"$or":queryArr};
        req.session.keyword=keyword;
    }else{
        req.session.keyword='';
    }
  //先查找 然后把user字符串转成user对象
    models.Article.find(queryObj).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec((err,docs)=>{
      if(err){
        req.flash('error','获取文章列表失败');
      }else{
        console.log(docs);
        //取得这个条件有多少符合的数据
          docs.forEach((article)=>{
              article.content=markdown.toHTML(article.content);
          });
          models.Article.count(queryObj,(err,count)=>{
              console.log(pageNum);
              console.log(count);
              res.render('index', {
                  title: '首页',
                  articles:docs,
                  totalPage:Math.ceil(count/pageSize),
                  keyword:req.session.keyword,
                  pageSize:pageSize,
                  pageNum:pageNum
              });
          });


      }
    });

});

module.exports = router;
