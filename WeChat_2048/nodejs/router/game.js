var express = require('express');
var router = express.Router();

let gameRouter = require("../controller/game.js"); // 调用controller中game.js中的方法

router.post('/save',gameRouter.save);
router.post('/saveMax',gameRouter.saveMax);
router.get('/getMax/:id',gameRouter.getMax);

module.exports = router;
