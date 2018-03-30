var express = require('express');
var router = express.Router();

/* GET users listing.
 * 只要写后半段就可以了，不同path的全部内容 */
router.get('/post', function(req, res, next) {
    res.render('index',{title:'发表文章'});
});

module.exports = router;
