## **目录**

[TOC]

### **服务器配置过程**

1、创建nodejs文件夹

2、初始化项目，创建package.json

`npm init -y`

3、安装express框架

`npm install express --save`

4、安装nodemon以监控文件修改

`npm install -g nodemon`

5、在nodejs文件夹中创建index.js

在index.js中写：

```js
var express = require('express');
var app = express();
var bodyParser =require('body-parser');
require("./database/dbconfig.js");

var userRouter = require('./router/user.js');
... //导入更多的路由模块

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
... //使用更多的路由模块

// 监听3000端口
app.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})

```

6、在nodejs文件夹中打开git bash

运行`nodemon index.js`命令

待看到nodemon的相关信息后表示打开成功

7、在nodejs文件夹中创建database文件夹，进入其中，创建dbconfig.js，配置数据库连接的相关信息（这里使用createConnection方法创建连接对象）

```js
//nodejs/database/dbconfig.js

const mysql = require('mysql') // 导入mysql模块

var pool = mysql.createConnection({ // 创建mysql实例
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'root',
  database:'wechat2048'
});

module.exports = {
  pool
}
```

8、在nodejs文件夹中创建router文件夹，进入其中，创建user.js文件，设置路由

9、在nodejs文件夹中创建controller文件夹，进入其中，创建user.js文件，设置接受网络请求的方法



### **如何使用nodejs⭐**

1、安装工程需要的所有依赖到本地

`npm install`

2、安装nodemon以监控文件修改

`npm install -g nodemon`

3、进入nodejs/database/dbconfig.js文件

修改数据库配置

4、进入nodejs/index.js文件

修改运行地址为自己的

5、进入nodejs文件夹

`cd nodejs`

6、在终端中运行

`nodemon index.js`命令

7、使用查看小程序的页面，进行一系列操作

