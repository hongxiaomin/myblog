### 一、安装生成器
``` 
npm install -g express-generator
```
### 二、生产项目
``` 
express blog20180327
```
### 三、启动项目
``` 
cd blog20180327 & npm install
SET DEBUG=blog20180327:* & npm start
```
### 四、提交git仓库
``` 
git init
git add -A
git commit -m"init"
git remote add origin https://github.com/hongxiaomin/myblog.git
git push -u origin master
```
### 五、bower的安装
``` 
npm install bower -g
```
### 六、编写.bowerrc配置文件并指定下载包的安装目录
``` 
{"directory":"./public/lib"}
```
### 七、安装bootstrap
``` 
bower install bootstrap
```
### 生成文件说明
- app.js:express的主配置文件
- package.json:存储着工程的信息及模块依赖，当在dependencies中添加依赖的模块时，运行`npm install`，npm会检查当前目录下的package.json，并自动安装所有指定的模块。
- node_modules:存放在package.json中安装的模块，当你在package.json添加依赖的模块并安装后，存放在这个文件夹下
- public:存放image、css、js等文件
- routes:存放路由文件
- views:存放视图文件或者说模板文件
- bin:可执行文件，可以从此启动服务器
