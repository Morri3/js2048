const app = getApp() // 获取应用实例
var Manager = require("./manager.js"); //引用manager.js
var util = require('../../utils/util.js'); //引用util.js

//设定在游戏中点击顶部导航栏返回到上一页，游戏成绩不记录数据库
Page({
  data: {
    size: 4,//棋盘大小
    hidden: false, //是否显示加载中画面
    grids: [], //二维数组表示棋盘
    score: 0, //当前分数
    maxScore: 0, //最高分
    tip: '', //提示语（超记录/得到2048分/其他情况）
    isFinished: false, //游戏是否结束
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady() {
    this.getMaxScore(); //从数据库获取最高分并设置到本页面中

    this.start(); //开始游戏
  },

  //游戏开始函数
  start() {
    var manager = new Manager(this.data.size); //Manager是整个棋盘的管理类
    this.setData({
      manager: manager, //this.data赋值manager，这里this.data.manager不能用manager的父类型的方法和属性
    });
    this.data.manager.__proto__ = manager.__proto__; //让this.data中的manager对象能使用manager对象的父类型的方法和属性

    this.setData({
      hidden: true,
      isFinished: false,
      score: 0,
      grids: this.data.manager.checkerboard.grid //棋盘赋值给this.grids
    });
  },

  //触摸
  touchStartX: 0, //x轴开始坐标
  touchStartY: 0, //y轴开始坐标
  touchEndX: 0, //x轴结束坐标
  touchEndY: 0, //y轴结束坐标

  //设置触摸开始坐标函数
  touchStart(ev) {
    var touch = ev.touches[0];
    this.touchStartX = touch.clientX; //触摸点的x轴
    this.touchStartY = touch.clientY; //触摸点的y轴
  },

  //设置触摸最后移动时坐标函数
  touchMove(ev) {
    var touch = ev.touches[0];
    this.touchEndX = touch.clientX; //触摸点的x轴
    this.touchEndY = touch.clientY; //触摸点的y轴
  },

  //设置触摸结束坐标函数
  touchEnd() {
    var disX = this.touchStartX - this.touchEndX; //x轴滑动的距离
    var absdisX = Math.abs(disX); //取x轴移动距离的绝对值
    var disY = this.touchStartY - this.touchEndY; //y轴滑动的距离
    var absdisY = Math.abs(disY); //取y轴移动距离的绝对值
    //判断游戏是否结束
    if (this.data.manager.isOver()) { //游戏结束了
      this.gameOver();
    } else { //游戏还没结束
      //确定是否在滑动
      if (Math.max(absdisX, absdisY) > 10) { //左右或上下移动距离只要大于10就视为滑动了
        this.setData({ //有滑动就设置按钮为“重新开始”
          start: "重新开始"
        });
        //确定移动的方向
        //disx<0右滑，方向是1；disx>0左滑，方向是3
        //disy<0下滑，方向是2；disy>0上滑，方向是0
        var direction = -1;
        if (absdisX > absdisY) {
          if (disX < 0) {
            direction = 1;
          } else {
            direction = 3;
          }
        } else {
          if (disY < 0) {
            direction = 2;
          } else {
            direction = 0;
          }
        }
        var data = this.data.manager.move(direction); //指定方向移动，得到的data是滑动合并后的棋盘数组
        this.updateGric(data); //更新视图
      }
    }
  },

  //更新视图，传入参数data是根据滑动方向生成的list数组
  updateGric(data) {
    //取当前这一刻的最好成绩（即棋盘中存在的最大数字）
    var max = 0; //最大值
    for (var i = 0; i < this.data.size; i++) {
      for (var j = 0; j < this.data.size; j++) {
        if (data[i][j] !== "" && data[i][j] > max) { //当前格子不为空且数字大于max
          max = data[i][j]; //找到当前棋盘中最大的，设置为当前成绩
        }
      }
    }

    this.setData({
      grids: data,
      score: max
    });
  },

  //游戏结束
  gameOver() {
    this.setData({
      isFinished: true // 游戏结束
    });
    console.log("游戏成绩是：" + this.data.score)

    //根据分数显示不同tip
    if (this.data.score >= 2048) {
      this.setData({
        tip: '-2048实现了！-'
      });
      wx.setStorageSync('maxScore', this.data.score); //成绩保存到缓存
    } else if (this.data.score > this.data.maxScore) {
      this.setData({
        tip: '-创造新纪录！-'
      });
      wx.setStorageSync('maxScore', this.data.score); //成绩保存到缓存

      //设置当前页面maxScore
      this.setData({
        maxScore: this.data.score
      })
      //保存最高分数到数据库
      this.saveMaxScore();
    } else { //没破记录或没到2048都显示游戏结束
      this.setData({
        tip: '-游戏结束-'
      });
    }

    //保存当前分数到数据库
    this.saveCurScore();
    //向数据库添加一条游戏记录
    this.saveAnRecord();
  },

  //从数据库获取最高分
  getMaxScore() {
    wx.request({
      method: 'GET',
      url: 'http://127.0.0.1:3000/game/getMax/' + app.globalData.user_id, //当前登录用户的id
      //data:{},
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        var tmp = -1
        if (res.data.msg.max_grade === null) { // 若数据库中还没有记录过成绩，就把tmp赋值0
          tmp = 0
        } else { // 否则赋值数据库中的成绩
          tmp = res.data.msg.max_grade
        }

        this.setData({
          maxScore: tmp
        })
      },
      fail: () => {
        console.log("最高成绩获取失败！")
      }
    })
  },

  //保存最高分数到数据库
  saveMaxScore() {
    wx.request({
      method: 'POST',
      url: 'http://127.0.0.1:3000/game/saveMax',
      data: {
        max_grade: this.data.score, //最高成绩
        id: app.globalData.user_id //当前用户的用户id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        console.log(res)
      },
      fail: () => {
        console.log("最高成绩保存失败！")
      }
    })
  },

  //保存当前分数到数据库
  saveCurScore() {
    //更新user表中的数据
    wx.request({
      method: 'POST',
      url: 'http://127.0.0.1:3000/game/save',
      data: {
        cur_grade: this.data.score, //成绩
        id: app.globalData.user_id //当前用户的用户id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        console.log(res)
      },
      fail: () => {
        console.log("成绩保存失败！")
      }
    })
  },

  //向record表添加数据
  saveAnRecord() {
    wx.request({
      method: 'POST',
      url: 'http://127.0.0.1:3000/record/save',
      data: {
        cur_grade: this.data.score, //成绩
        create_time: util.formatTime(new Date()), //当前时间
        id: app.globalData.user_id //当前用户的用户id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        console.log(res)
      },
      fail: () => {
        console.log("成绩记录保存失败！")
      }
    })
  },

  //一局游戏结束点击重新开始按钮
  restart() {
    this.setData({
      isFinished: false
    })

    //开始游戏
    this.start();
  },

  //关闭蒙版和弹窗
  close() {
    this.setData({
      isFinished: false //把游戏结束状态改回未结束，在下一次游戏开始时是正常的
    })

    //开始游戏
    this.start();

    //跳转到首页
    wx.switchTab({
      url: '../game_entrance/entrance'
    })
  }
})
