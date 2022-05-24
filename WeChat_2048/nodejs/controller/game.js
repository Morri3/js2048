let {
  pool
} = require("../database/dbconfig.js")
var flap = require('flap') //引入flap

//保存游戏的成绩
module.exports.save = async (req, res) => {
  console.log(req.body) //获得请求体

  //使用flap对成绩进行处理
  console.log("flap之前：" + req.body.cur_grade) //测试
  const max = (...args) => args.reduce((pre, cur) => pre > cur ? pre : cur) //取最大值
  const flap_max = flap.guard(max).map(arg => arg > 0 ? arg : 0) //flap对参数为0的时候把值为0
  console.log("flap之后：" + flap_max(0, req.body.cur_grade)) //测试
  let params = [flap_max(0, req.body.cur_grade), req.body.id] //sql语句参数进行处理

  var sql = "update user set cur_grade=? where id=?;"; //sql语句
  pool.query(sql, params, (error, result) => { //第一个参数sql语句，第二个参数是sql语句的参数
    if (error) { //有错误
      res.json({
        status: "400",
        data: '普通模式保存成绩失败',
        msg: error
      })
      console.log("普通模式保存成绩失败")
    } else { //成功
      res.json({
        status: "200",
        data: '普通模式保存成绩成功',
        msg: result
      })
      console.log("普通模式保存成绩成功")
    }
  });
}

//保存游戏的最高成绩
module.exports.saveMax = async (req, res) => {
  console.log(req.body) //获得请求体

  //使用flap对成绩进行处理
  console.log("flap之前：" + req.body.max_grade) //测试
  const max = (...args) => args.reduce((pre, cur) => pre > cur ? pre : cur) //取最大值
  const flap_max = flap.guard(max).map(arg => arg > 0 ? arg : 0) //flap对参数为0的时候把值为0
  console.log("flap之后：" + flap_max(0, req.body.max_grade)) //测试
  let params = [flap_max(0, req.body.max_grade), req.body.id] //sql语句参数进行处理

  var sql = "update user set max_grade=? where id=?;"; //sql语句
  pool.query(sql, params, (error, result) => { //第一个参数sql语句，第二个参数是sql语句的参数
    if (error) { //有错误
      res.json({
        status: "400",
        data: '普通模式保存最高成绩失败',
        msg: error
      })
      console.log("普通模式保存最高成绩失败")
    } else { //成功
      res.json({
        status: "200",
        data: '普通模式保存最高成绩成功',
        msg: result
      })
      console.log("普通模式保存最高成绩成功")
    }
  });
}

//获取最高成绩
module.exports.getMax = (req, res) => {
  console.log(req.params) //获得请求体
  let param = [req.params.id] //sql语句参数进行处理
  var sql = "select max_grade from user where id=?;"; //sql语句
  pool.query(sql, param, (error, result) => { //第一个参数sql语句，第二个参数是sql语句的参数
    if (error) { //有错误
      res.json({
        status: "400",
        data: '普通模式获取最高成绩失败',
        msg: error
      })
    } else { //成功
      console.log(result[0])

      res.json({
        status: "200",
        data: '普通模式获取最高成绩成功',
        msg: result[0]
      })
    }
  });
}


//保存游戏困难模式的成绩
module.exports.saveDifficult = async (req, res) => {
  console.log(req.body) //获得请求体

  //使用flap对成绩进行处理
  console.log("flap之前：" + req.body.cur_difficult_grade) //测试
  const max = (...args) => args.reduce((pre, cur) => pre > cur ? pre : cur) //取最大值
  const flap_max = flap.guard(max).map(arg => arg > 0 ? arg : 0) //flap对参数为0的时候把值为0
  console.log("flap之后：" + flap_max(0, req.body.cur_difficult_grade)) //测试
  let params = [flap_max(0, req.body.cur_difficult_grade), req.body.id] //sql语句参数进行处理

  var sql = "update user set cur_difficult_grade=? where id=?;"; //sql语句
  pool.query(sql, params, (error, result) => { //第一个参数sql语句，第二个参数是sql语句的参数
    if (error) { //有错误
      res.json({
        status: "400",
        data: '困难模式保存成绩失败',
        msg: error
      })
    } else { //成功
      res.json({
        status: "200",
        data: '困难模式保存成绩成功',
        msg: result
      })
    }
  });
}

//保存游戏困难模式的最高成绩
module.exports.saveMaxDifficult = async (req, res) => {
  console.log(req.body) //获得请求体

  //使用flap对成绩进行处理
  console.log("flap之前：" + req.body.max_difficult_grade) //测试
  const max = (...args) => args.reduce((pre, cur) => pre > cur ? pre : cur) //取最大值
  const flap_max = flap.guard(max).map(arg => arg > 0 ? arg : 0) //flap对参数为0的时候把值为0
  console.log("flap之后：" + flap_max(0, req.body.max_difficult_grade)) //测试
  let params = [flap_max(0, req.body.max_difficult_grade), req.body.id] //sql语句参数进行处理

  var sql = "update user set max_difficult_grade=? where id=?;"; //sql语句
  pool.query(sql, params, (error, result) => { //第一个参数sql语句，第二个参数是sql语句的参数
    if (error) { //有错误
      res.json({
        status: "400",
        data: '困难模式保存最高成绩失败',
        msg: error
      })
    } else { //成功
      res.json({
        status: "200",
        data: '困难模式保存最高成绩成功',
        msg: result
      })
    }
  });
}

//获取困难模式的最高成绩
module.exports.getMaxDifficult = (req, res) => {
  console.log(req.params) //获得请求体
  let param = [req.params.id] //sql语句参数进行处理
  var sql = "select max_difficult_grade from user where id=?;"; //sql语句
  pool.query(sql, param, (error, result) => { //第一个参数sql语句，第二个参数是sql语句的参数
    if (error) { //有错误
      res.json({
        status: "400",
        data: '获取困难模式的最高成绩失败',
        msg: error
      })
    } else { //成功
      console.log(result[0])
      res.json({
        status: "200",
        data: '获取困难模式的最高成绩成功',
        msg: result[0]
      })
    }
  });
}