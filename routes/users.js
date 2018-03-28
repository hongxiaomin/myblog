var express = require('express');
var router = express.Router();

/* GET users listing.
 * 只要写后半段就可以了，不同path的全部内容 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
