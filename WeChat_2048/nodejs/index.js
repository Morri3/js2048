var express = require('express');
var app = express();
var bodyParser = require('body-parser'); /*中间件用于处理JSON,Raw,Text和URL编码的数据*/
require("./database/dbconfig.js");

var userRouter = require('./router/user.js');
var gameRouter = require('./router/game.js');
var recordRouter = require('./router/record.js');

//增加头部信息解决跨域问题
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//bodyParser解释前端提交数据
app.use(bodyParser.urlencoded({
  extended: true
})); // 配置解析表单数据的中间件
app.use(bodyParser.json());

// 导入并使用用户路由模块
app.use('/user', userRouter);
// 导入并使用游戏路由模块
app.use('/game', gameRouter);
// 导入并使用游戏记录路由模块
app.use('/record', recordRouter);

// 监听3000端口
app.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})