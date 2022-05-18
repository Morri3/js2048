var express = require('express');
var router = express.Router();

let recordRouter = require("../controller/record.js"); // 调用controller中record.js中的方法

router.post('/save',recordRouter.save);

module.exports = router;
