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
