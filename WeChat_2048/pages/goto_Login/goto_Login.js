// pages/goto_Login/goto_Login.js
var app = getApp()
var zyy_is = false;
Page({

  data: {
       userInfo:{}
  },
  onLoad: function () {

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

    })
    app.globalData.has=true;
    app.globalData.user=this.data.userInfo;
    wx.switchTab({
      url: '../User/User'
    })
  }
  
})