var express = require('express');
var router = express.Router(); //使用路由

let gameRouter = require("../controller/game.js"); //调用controller中game.js中的方法

//普通模式
router.post('/save', gameRouter.save);
router.post('/saveMax', gameRouter.saveMax);
router.get('/getMax/:id', gameRouter.getMax);

//困难模式
router.post('/difficult/save', gameRouter.saveDifficult);
router.post('/difficult/saveMax', gameRouter.saveMaxDifficult);
router.get('/difficult/getMax/:id', gameRouter.getMaxDifficult);

module.exports = router;