const mysql = require('mysql') // 导入mysql模块

//数据库配置
// module.exports = {
//   config: {
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: 'root',
//     database: 'wechat2048'
//   },
//   //使用mysql的连接池连接方式来连接数据库
//   sqlConnect: function(sql, sqlArr, callBack) {
//     var pool = mysql.createPool(this.config) //创建一个连接池
//     pool.getConnection((err, conn) => { //连接池进行连接
//       if (err) {
//         console.log('连接失败!')
//         console.log(err)
//         return;
//       }
//       //事件驱动回调
//       conn.query(sql, sqlArr, callBack);
//       //释放连接
//       conn.release();
//     })
//   }
// }

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