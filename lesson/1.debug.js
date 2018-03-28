//这是一个日志记录器，用于向控制台输出日志
var debug = require('debug');
console.log('hello');
//错误日志
var error_debug=debug('blog20180327:error');
error_debug('error');

//当项目中出现警告的时候输出的日志
var warn_debug=debug('blog20180327:warn');
warn_debug('warn');

//调试日志 开发的时候需要看到的
var log_debug=debug('blog20180327:log');
log_debug('log');