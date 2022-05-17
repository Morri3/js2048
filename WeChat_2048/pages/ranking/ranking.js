// pages/ranking/ranking.js
Page({

  data: {
    user:[
      {}
    ]
  },

  getAllUser:function(options){
    console.log(this.data.user)
  },

  sortByScore:(a,b) =>{
    return b.max_grade - a.max_grade
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let users = []
    wx.request({
      method:'GET',
      url: 'http://127.0.0.1:3000/user/getall',
      data:{},
      header: {
        'content-type': 'application/json'
      },
      success: (res) =>{
        var users = []
        for(var i = 0; i < res.data.msg.length; i++){
          users.push(res.data.msg[i])
        }
        users.sort(this.sortByScore)
        this.setData({
          user:users
        })
      },
      fail:() =>{
        console.log("加载失败")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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