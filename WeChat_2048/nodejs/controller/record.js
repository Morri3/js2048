let {
  pool
} = require("../database/dbconfig.js")

//保存游戏的记录
module.exports.save = async (req, res) => {
  let params = [req.body.id, req.body.cur_grade, req.body.create_time, req.body.game_mode] //sql语句参数进行处理
  var sql = "insert into record(user_id,cur_grade,create_time,game_mode) values(?,?,?,?);"; //sql语句
  pool.query(sql, params, (error, result) => { //第一个参数sql语句，第二个参数是sql语句的参数
    if (error) { //有错误
      res.json({
        status: "400",
        data: '普通模式保存成绩记录失败',
        msg: error
      })
    } else { //成功
      res.json({
        status: "200",
        data: '普通模式保存成绩记录成功',
        msg: result
      })
    }
  });
}

//困难模式保存游戏的记录
module.exports.saveDifficult = async (req, res) => {
  let params = [req.body.id, req.body.cur_grade, req.body.create_time, req.body.game_mode] //sql语句参数进行处理
  var sql = "insert into record(user_id,cur_grade,create_time,game_mode) values(?,?,?,?);"; //sql语句
  pool.query(sql, params, (error, result) => { //第一个参数sql语句，第二个参数是sql语句的参数
    if (error) { //有错误
      res.json({
        status: "400",
        data: '困难模式保存成绩记录失败',
        msg: error
      })
    } else { //成功
      res.json({
        status: "200",
        data: '困难模式保存成绩记录成功',
        msg: result
      })
    }
  });
}