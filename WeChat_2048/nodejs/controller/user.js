let { pool } = require("../database/dbconfig.js")


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

//获取所有用户信息
module.exports.getall = async (req,res) =>{
  let sql="select * from user;" //sql语句
  pool.query(sql,function(error, result){
    if(error) { //有错误
      res.json({
        status: "400",
        data: '查询用户失败',
        msg: ''
      })
      console.log("查询用户失败")
    }else { //成功
      res.json({
        status: "200",
        data: '查询用户成功',
        msg: result
      })
      console.log("success ",result)
    }
  });
}

//获取权限后添加用户
module.exports.adduser = async (req,res) =>{
  var msg  = JSON.parse(req.body.msg)
  console.log(msg)
  //空白字段
  var sql="insert into user(user_name,user_img,max_grade,cur_grade) values(?,?,0,0);"; //sql语句
  var params = [msg.user_name,msg.user_img]
  pool.query(sql,params,function(error, result){
    if(error) { //有错误
      res.json({
        status: "400",
        data: '添加失败',
        msg: ''
      })
      console.log(res)
    }else { //成功
      res.json({
        status: "200",
        data: '添加用户成功',
        msg: result
      })
      console.log("success ",result)
    }
  });
}


