var express = require('express');
var router = express.Router();

let userRouter = require("../controller/user.js"); // 调用controller中user.js中的方法


router.get('/get/:u_username/:u_pwd',userRouter.get);//带参数

//获取用户信息
router.get('/getall',userRouter.getall);
//添加用户
router.post('/adduser',userRouter.adduser)
//查找用户
router.get('/searchUser',userRouter.searchUser)

module.exports = router;
