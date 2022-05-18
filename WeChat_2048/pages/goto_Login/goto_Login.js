// pages/goto_Login/goto_Login.js
var app = getApp()

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
      success: () =>{
       console.log("添加成功")
      },
      fail:() =>{
        console.log("添加失败")
      }
    })
  },

  searchUser:(user_name) =>{
    var name  = user_name
    var flag = false
    let resultpromise = new Promise(function(resolve, reject){
      wx.request({
        url: 'http://127.0.0.1:3000/user/searchUser',
        data:{
          name
        },
        header:{
          'content-type': 'application/json'
        },
        method:'GET',
        success: (res) =>{
          if(res.data.msg.length != 0){
            var id = res.data.msg[0].id
            app.globalData.user_id = id
            flag = true
          }
          else{
            flag = false
          }
          resolve(flag)
        },
        fail:() =>{
          reject(flag)
        }
      })     
    })

    return resultpromise

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
        //查询用户是否已经存在
        var promise = this.searchUser(res.userInfo.nickName)
        promise.then((data) =>{
          //如果是新注册用户添加到数据库
          if(data == false){
            this.addUser(res.userInfo.nickName,res.userInfo.avatarUrl)
          }
        })
    })
    app.globalData.has=true;
    app.globalData.user=this.data.userInfo;

    //跳转到首页
    wx.switchTab({
      url: '../game_entrance/entrance'
    })
  }
  
})