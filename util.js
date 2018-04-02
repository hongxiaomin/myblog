exports.md5=(input)=>{
  const crypto = require('crypto');
  return crypto.createHash('md5').update(input).digest('hex');//以16进制表示输出
};