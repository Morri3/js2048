// pages/game_entrance/entrance.js
Page({
  data: {
    msg: null //测试用的msg
  },

  //开始游戏按钮
  click(){
    wx.navigateTo({
      url: '/pages/game/game',
    })
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    wx.request({
      method:'GET',//请求方式（默认为GET请求）
      url:'http://127.0.0.1:3000/',//服务器接口地址
      // data:e.detail.value,//请求的参数
      //接口调用成功的回调函数
      success:res=>{//res表示服务器响应信息
        console.log(res.data)
        this.setData({
          msg: res.data
        })
        console.log(this.data.msg)
      }
    })
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})