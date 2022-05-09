let { pool } = require("../database/dbconfig.js")

//添加用户
module.exports.add = async (req,res) => {
  // console.log(req.params.id) //获得参数id
  console.log(req.body) //获得请求体
  let params = [ //sql语句参数进行处理
    req.body.u_username?req.body.u_username:"",
    req.body.u_pwd?req.body.u_pwd:"",
    req.body.u_name?req.body.u_name:""
  ]
  var sql="insert into user(u_username,u_pwd,u_name) values(?,?,?);"; //sql语句
  pool.query(sql,params,(error, result)=>{ //第一个参数sql语句，第二个参数是sql语句的参数
    if(error) { //有错误
      res.json({
        status: "400",
        data: '添加用户失败'
      })
      console.log("添加用户失败")
    }else { //成功
      res.json({
        status: "200",
        data: '添加用户成功'
      })
      console.log("添加用户成功")
    }
  });
}

//查询用户（还没有作是否存在于db中等判断）
module.exports.get = (req,res) =>{
  console.log(req.params)
  let params = [req.params.u_username,req.params.u_pwd] //sql语句参数
  let sql="select * from user where u_username = ? and u_pwd = ?;" //sql语句
  pool.query(sql,params,function(error, result){
    if(error) { //有错误
      res.json({
        status: "400",
        data: '查询用户失败',
        msg: ''
      })
      console.log("查询用户失败")
    }else { //成功
      console.log(result)
      res.json({
        status: "200",
        data: '查询用户成功',
        msg: result[0]
      })
      console.log("查询用户成功")
    }
  });
}

