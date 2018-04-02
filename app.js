var createError = require('http-errors');
var express = require('express');
//处理路径的 path.join  path.resolve
var path = require('path');
//解析cookie req.cookie属性存放着客户端提交过来的cookie
//req.cookie(key,value)向客户端写入cookie
var cookieParser = require('cookie-parser');
//写日志的
var logger = require('morgan');
//主页路由
var indexRouter = require('./routes/index');
//用户路由
var usersRouter = require('./routes/users');

var articlesRouter=require('./routes/articles');

var session = require('express-session');//session 依赖于cookie，所以要引用在cookie后面

var MongoStore = require('connect-mongo')(session);//将session会话保存到数据库

var flash = require('connect-flash');
var config = require('./config');
//得到app
var app = express();

// view engine setup
//设置模板的存放路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'html');
//指定HTML模板的渲染方法
app.engine('html',require('ejs').__express);
//日志记录中间件
app.use(logger('dev'));
//处理content-type=json的请求体
app.use(express.json());
//处理content-type=urlencoded的请求体 extended为true表示使用querystring来处理请求体的字符串转换成对象
app.use(express.urlencoded({ extended: false }));
//cookie处理中间件 req.cookies res.cookie(key,value)
app.use(cookieParser());
app.use(session({
    secret:'hxm',
    resave:true,//每次响应结束后都保存一下session数据
    saveUninitialized:true,//保存新创建但未初始化的session
    store:new MongoStore({
        url:config.dbUrl
    })
}));
app.use(flash());//依赖于session
app.use((req,res,next)=>{
  //res.locals才是真正的渲染模板的对象
  res.locals.user=req.session.user;
  res.locals.success=req.flash('success').toString();
  res.locals.error=req.flash('error').toString();
  next();
});
//静态文件服务中间件 指定一个绝对目录的路径作为静态文件的根目录
app.use(express.static(path.join(__dirname, 'public')));
//指定路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
//错误处理中间件有四个参数 ，第一个参数是错误对象
//如果有中间件出错了，会把请求转交给错误处理中间件来处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
