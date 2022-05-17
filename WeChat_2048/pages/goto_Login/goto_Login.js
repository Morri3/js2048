// pages/goto_Login/goto_Login.js
var app = getApp()
var zyy_is = false;
Page({

  data: {
       userInfo:{}
  },
  onLoad: function () {

  },

  addUser:(user_name,user_img) =>{
    var _name  = user_name
    var _img = user_img
    var msg = JSON.stringify({
      user_name:_name,
      user_img:_img
    })
    wx.request({
      url: 'http://127.0.0.1:3000/user/adduser',
      data:{
        msg:msg
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method:'POST',
      success: (res) =>{
       console.log(res)
      },
      fail:() =>{
        console.log("添加失败")
      }
    })
  },


  async getUserProfile(e) {
    await wx.getUserProfile({
      desc: '用于完善会员资料',
    })
    .then(res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.user_name = res.userInfo.nickName;
        app.globalData.user_head = res.userInfo.avatarUrl;
        //添加到数据库
        this.addUser(res.userInfo.nickName,res.userInfo.avatarUrl)
    })
    app.globalData.has=true;
    app.globalData.user=this.data.userInfo;
    wx.switchTab({
      url: '../User/User'
    })
  }
  
})