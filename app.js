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
//静态文件服务中间件 指定一个绝对目录的路径作为静态文件的根目录
app.use(express.static(path.join(__dirname, 'public')));
//指定路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
