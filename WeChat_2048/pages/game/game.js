const app = getApp()// 获取应用实例
var Manager = require("./manager.js");//引用manager.js

Page({
  data: {
    hidden: false,//是否显示加载中画面
    grids: [],//二维数组表示棋盘
    score: 0,//当前分数
    bestScore: 0,//最高分
    endMsg: '',//结束的信息
    isFinished: false,//游戏是否结束
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    if(!wx.getStorageSync("bestScore")) {//缓存中无最高分数据，则设置最高分，默认值是0
      wx.setStorageSync('bestScore', 0);
    }
    this.start();
  },
  //游戏开始函数
  start(){
    var manager = new Manager(4);//Manager是整个棋盘的管理类
    this.setData({
      manager: manager,//this.data赋值manager，这里this.data.manager不能用manager的父类型的方法和属性
      bestScore: wx.getStorageSync('bestScore')//缓存获取最高分
    });
    this.data.manager.__proto__=manager.__proto__;//让this.data中的manager对象能使用manager对象的父类型的方法和属性
    
    this.setData({
      hidden: true,
      isFinished: false,
      score: 0,
      grids: this.data.manager.checkerboard.grid//棋盘赋值给this.grids
    });
  },
  //触摸
  touchStartX: 0,//x轴开始坐标
  touchStartY: 0,//y轴开始坐标
  touchEndX: 0,//x轴结束坐标
  touchEndY: 0,//y轴结束坐标
  //设置触摸开始坐标函数
  touchStart(ev) {
    var touch = ev.touches[0];
    this.touchStartX = touch.clientX;//触摸点的x轴
    this.touchStartY = touch.clientY;//触摸点的y轴
  },
  //设置触摸最后移动时坐标函数
  touchMove(ev) {
    var touch = ev.touches[0];
    this.touchEndX = touch.clientX;//触摸点的x轴
    this.touchEndY = touch.clientY;//触摸点的y轴
  },
  //设置触摸结束坐标函数
  touchEnd() {
    var disX = this.touchStartX - this.touchEndX;//x轴滑动的距离
    var absdisX = Math.abs(disX);//取x轴移动距离的绝对值
    var disY = this.touchStartY - this.touchEndY;//y轴滑动的距离
    var absdisY = Math.abs(disY);//取y轴移动距离的绝对值
    //判断游戏是否结束
    if(this.data.manager.isOver()) {//游戏结束了
      this.gameOver();
    }else {//游戏还没结束
      //确定是否在滑动
      if(Math.max(absdisX, absdisY) > 10) {//左右或上下移动距离只要大于10就视为滑动了
        this.setData({//有滑动就设置按钮为“重新开始”
          start: "重新开始"
        });
        //确定移动的方向
        //disx<0右滑，方向是1；disx>0左滑，方向是3
        //disy<0下滑，方向是2；disy>0上滑，方向是0
        var direction = -1;
        if(absdisX > absdisY) {
          if(disX < 0) {
            direction = 1;
          }else {
            direction = 3;
          }
        }else {
          if(disY < 0) {
            direction = 2;
          }else {
            direction = 0;
          }
        }
        var data = this.data.manager.move(direction);//指定方向移动，得到的data是滑动合并后的棋盘数组
        this.updateGric(data);//更新视图
      }
    }
  },
  //更新视图，传入参数data是根据滑动方向生成的list数组
  updateGric(data) {
    //取当前这一刻的最好成绩（即棋盘中存在的最大数字）
    var max = 0;//最大值
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 4; j++) {
        if(data[i][j]!=="" && data[i][j]>max) {//当前格子不为空且数字大于max
          max = data[i][j];//找到当前棋盘中最大的，设置为当前成绩
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
      isFinished: true
    });
    //根据分数显示不同标语
    if(this.data.score >= 2048) {
      this.setData({
        endMsg: '恭喜达到2048！'
      });
      wx.setStorageSync('bestScore', this.data.score);
    }else if(this.data.score > this.data.bestScore) {
      this.setData({
        endMsg: '创造新纪录！'
      });
      wx.setStorageSync('bestScore', this.data.score);
    }else {//没破记录或没到2048都显示游戏结束
      this.setData({
        endMsg: '游戏结束！'
      });
    }
  },
  //一局游戏结束点击重新开始按钮
  restart(){
    this.setData({
      isFinished: false
    })
    this.start();
  },
  //关闭蒙版和弹窗
  close(){
    this.setData({
      isFinished: false
    })
    this.start();
    
    //跳转到主页
    wx.switchTab({
      url: '../home/home'
    })
  }
})
