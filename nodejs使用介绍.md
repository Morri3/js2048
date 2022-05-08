## **目录**

[TOC]

### **创建nodejs过程**

1、创建nodejs文件夹

2、初始化项目，创建package.json

`npm init -y`

3、安装express框架

`npm install express --save`

4、安装nodemon监控文件修改

`npm install -g nodemon`

5、在nodejs文件夹中创建index.js

在index.js中写：

```
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

// 处理POST请求
app.post('/', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

var data = {
  //数据
}

// 处理GET请求
app.get('/', (req, res) => {
  res.json(data)
})

// 监听3000端口
app.listen(3000, () => {
  console.log('server running at http://127.0.0.1:3000')
})
```

6、在nodejs文件夹中打开git bash

运行`nodemon index.js`命令

待看到nodemon的相关信息后表示打开成功

7、在浏览器中打开localhost:3000查看测试数据



### **配置mysql数据库**

1、



### **使用node.js**

1、