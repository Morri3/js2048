// pages/ranking/ranking.js
Page({

  data: {
    user:[
      {}
    ],
    user_diff:[
      {}
    ],
    model:0
  },


  simple_model:function(){
    this.setData({
      model:0
    })
    console.log("model:"+this.data.model)
  },

  difficult_model:function(){
    this.setData({
      model:1
    })
    console.log("model:"+this.data.model)
  },


  getAllUser:function(options){
    console.log(this.data.user)
  },

  sortByScore:(a,b) =>{
    return b.max_grade - a.max_grade
  },
  sortByScoreDiff:(a,b) =>{
    return b.max_difficult_grade - a.max_difficult_grade
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
        var users_diff = []
        for(var i = 0; i < res.data.msg.length; i++){
          users.push(res.data.msg[i])
          users_diff.push(res.data.msg[i])
        }
        users.sort(this.sortByScore)
        users_diff.sort(this.sortByScoreDiff)
        this.setData({
          user:users,
          user_diff:users_diff
        })
      },
      fail:() =>{
        console.log("加载失败")
      }
    })
  },

})