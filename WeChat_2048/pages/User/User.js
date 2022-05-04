var app = getApp()
var zyy_is = false;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad(options) {
      this.setData({
        canIUseGetUserProfile: true,
        hasUserInfo:app.globalData.has,
        userInfo:app.globalData.user
      })
  }
})
