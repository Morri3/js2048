const express = require('express')
const bodyParser = require('body-parser')
const app = express()

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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// 处理POST请求
app.post('/', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

var data = {
  name: '张三',
  gender: [
    { name: '男', value: '0', checked: true },
    { name: '女', value: '1', checked: false }
  ],
  skills: [
    { name: 'HTML', value: 'html', checked: true }
  ]
}

// 处理GET请求
app.get('/', (req, res) => {
  res.json(data)
})

// 监听3000端口
app.listen(3000, () => {
  console.log('server running at http://127.0.0.1:3000')
})
