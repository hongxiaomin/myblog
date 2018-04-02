### 路由工作原理
``` 
const express = require('express');
const router = express.Router();
router.get('/',(req,res,next)=>{
    res.render('index',{title:'Express'});
});
module.exports=router;
```
这段代码的意思是当访问主页时，调用ejs模板引擎，来渲染index.ejs模板文件（即将title变量全部替换为字符串Express），生成静态页面并显示在浏览器中。
#### 路由配置
express封装了多种http请求方式，主要使用get和POST两种，即app.get()和app.post()。
app.get()和app.post()的第一个参数都为请求的路径，第二个参数为处理请求的回调函数，回调函数有两个参数分别是req和res，代表请求信息和响应信息。路径请求及对应的获取路径有以下几种形式：
- req.query(处理get请求，获取查询字符串)
``` 
GET/index.html?name=zfpx
req.query.name ->zfpx
```
- req.params(处理/:name形式的get或post请求，获取请求参数)
``` 
GET/user/zfpx
req.params.name -> zfpx
```
- req.body(处理post请求，获取post请求体)
``` 
req.body.name
```
### 什么是模板引擎
模板引擎（Template Engine）是一个将页面模板和要显示的数据结合起来生成HTML页面的工具。如果说上面讲到的express中的路由控制方法相当于MVC中的控制器的话，那模板引擎就相当于MVC中的视图。
#### ejs
使用模板引擎，通过以下两行代码设置模板文件的存储位置和使用的模板引擎
``` 
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
```
- 注意：我们通过express -e blog20180327只是初始化了一个使用ejs模板引擎的工程而已，比如node_modules下添加了ejs模块，views文件夹下有index.ejs。并不是说强制该工程只能使用ejs不能使用其他的模板引擎比如jade，真正指定使用哪个模板引擎的是app.set('view engine','ejs').
- 在router/index.js中通过调用res.render()渲染模板，并将其产生的页面直接返回给客户端。它接收两个参数，第一个是模板的名称，即views目录下的模板文件名，扩展名为.ejs可选。第二个参数是传递给模板的数据对象，用于模板翻译。
``` 
const express = require('express');
const router = express.Router();
router.get('/',(req,res,next)=>{
    res.render('index',{title:'Express'});
});
module.exports=router;
```
当我们res.render('index',{title:'Express'})时，模板引擎会把<%= title %>替换成Express，然后把替换后的页面显示给用户。

``` 
ejs的标签有以下三种标签：
<% code %>:JavaScript代码。
<%= code %>:显示替换过HTML特殊字符的内容。
<%- code %>:显示原始HTML内容。
注意：<%= code %>和<%- code %>的区别，当变量code为普通字符串时，两者没有区别。
include布局
<%- include a %>
hello, world!
<%- include b %>
a.ejs:this is a.ejs
b.ejs:this is b.ejs
最终Index.ejs会显示：
this is a.ejs
hello,world!
this is b.ejs
```
### 功能与设计
#### 功能分析
搭建一个简单的具有多人注册、登录、发表文章、登出功能的博客
#### 设计目标
- 未登录：主页导航显示 首页、注册、登录，下面显示已发表的文章、发表日期及作者。
- 登陆后：主页导航显示 首页、发表文章，退出，下面显示已发表的文章。发表日期及作者。
- 用户登录、注册、发表成功以及等出后都返回到主页。

### 路由规划
路由规划，或者说控制器规划是整个网站的骨架部分，因为它处于整个架构的枢纽位置，相当于各个接口之间的粘合剂，所以应该优先考虑。
- /:首页
- /users/login:用户登录
- /users/reg:用户注册
- /articles/post:发表文章
- /users/logout:登出

### 安装会话支持模式
使用express-session和connect-mongo模块实现了将会话信息存储到MongoDB中。
``` 
npm install express-session --save
npm install connect-mongo --save
```
修改app.js

### 页面通知
我们需要引入flash模块来实现页面通知（即成功与错误信息的显示）的功能。
#### 什么是flash
我们所说的flash即connect-falsh模块（https://github.com/jaredhanson/connect-flash），flash是一个在session中用于存储信息的特定区域。信息写入flash，下一次显示完毕后即被清楚。典型的应用是结合重定向的功能，确保信息是提供给下一个被渲染的页面。
#### 安装模块
``` 
npm install connect-flash --save
```
#### 在app.js中添加调用此模块
``` 
var flash = require('connect-flash');
app.use(flash());
```
#### 在发表文章的路由里放置flash提示信息
### 文章内容使用Markdown
#### 安装markdown插件
``` 
npm install markdown --save
```
### 发表文章时可以上传图片
``` 
npm install multer --save
```





