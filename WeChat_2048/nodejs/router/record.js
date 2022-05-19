var express = require('express');
var router = express.Router();

let recordRouter = require("../controller/record.js"); // 调用controller中record.js中的方法

//普通模式
router.post('/save', recordRouter.save);

//困难模式
router.post('/difficult/save', recordRouter.saveDifficult);

module.exports = router;