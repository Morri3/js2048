// const express = require('express')
// const bodyParser = require('body-parser') /*中间件用于处理JSON,Raw,Text和URL编码的数据*/
// var cookieParser = require('cookie-parser') /*解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象*/
// const path=require('path') /*路径模块*/
// var http = require('http'); /*http模块*/
// var morgan = require('morgan'); /*http请求日志记录中间件*/
// var cors = require('cors'); /*用于解决跨域*/
// require("./database/dbconfig.js")
// var app = express()
// var router = express.Router()
// //解决跨域
// app.use(cors());

// // //改写
// // var http = require('http');
// // var server = http.createServer(app);

// //增加头部信息解决跨域问题
// app.all('*', function (req, res, next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// // // view engine setup
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'jade');
// // app.use(logger('dev'));
// //bodyParser解释前端提交数据
// app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // 配置解析表单数据的中间件
// // app.use(cookieParser());
// // app.use(express.static(path.join(__dirname, 'public')));

// // 导入并使用用户路由模块
// const userRouter = require('./router/user.js')
// app.use('/user', userRouter)

// // // 处理POST请求
// // app.post('/', (req, res) => {
// //     console.log(req.body)
// //     res.json(req.body)
// // })

// // 数据
// var data = {
//   name: '张三',
//   gender: [
//     { name: '男', value: '0', checked: true },
//     { name: '女', value: '1', checked: false }
//   ],
//   skills: [
//     { name: 'HTML', value: 'html', checked: true }
//   ]
// }

// // // 处理GET请求
// // app.get('/', (req, res) => {
// //   res.json(data)
// // })

// // // 捕获404并转发给错误处理程序
// // app.use(function(req, res, next) {
// //   next(createError(404));
// // });

// // // 错误处理
// // app.use(function(err, req, res, next) {
// //   // 设置局部变量，只提供开发中的错误
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get('env') === 'development' ? err : {};

// //   // 呈现错误页面
// //   res.status(err.status || 500);
// //   res.render('error');
// // });

// // 监听3000端口
// app.listen(3000, () => {
//   console.log('server running at http://localhost:3000')
// })

var express = require('express');
var app = express();
var bodyParser =require('body-parser');
require("./database/dbconfig.js");

var userRouter = require('./router/user.js');
var gameRouter = require('./router/game.js');

//增加头部信息解决跨域问题
app.all('*', function (req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//bodyParser解释前端提交数据
app.use(bodyParser.urlencoded({extended:true}));// 配置解析表单数据的中间件
app.use(bodyParser.json());

// 导入并使用用户路由模块
app.use('/user', userRouter);
// 导入并使用游戏路由模块
app.use('/game', gameRouter);

// 监听3000端口
app.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
