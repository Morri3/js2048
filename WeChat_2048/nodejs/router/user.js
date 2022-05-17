var express = require('express');
var router = express.Router();

let userRouter = require("../controller/user.js"); // 调用controller中user.js中的方法

router.post('/create',userRouter.add);//不带参数
router.get('/get/:u_username/:u_pwd',userRouter.get);//带参数

//获取用户信息
router.get('/getall',userRouter.getall);

module.exports = router;
