//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    focusFlag:false,
    inputValue: '',
    list: [{
      msg: '去北京',
      isFinish: false
    },
      {
        msg: '去玩',
        isFinish: true
      }
    ],
    userInfo: {},
    hasUserInfo: true
  },
  // 绑定输入的值
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 添加todolist
  bindAdd: function (e) {
    if (this.data.inputValue === ''){
      return
    }
    var todolist = this.data.list;
    var flag = true
    todolist.forEach(i => {
      if (i.msg == this.data.inputValue) {
        wx.showToast({
          title: this.data.inputValue + 'have been add',
          duration:1300
        })
        flag = false 
        return;
      }
    })
    if (!flag) {
      return
    } else {
      var newMsg = {
        data: '',
        msg: this.data.inputValue,
        isFinish: false
      }
      todolist.push(newMsg)
      this.setData({
        list: todolist
      })
      this.setData({
        inputValue: ''
      })
    }

  },
  // 输入框和按钮样式控制 ----------start-------
  focus:function () {
    this.setData({
      focusFlag :true
    })
  },
  blur:function() {
    this.setData({
      focusFlag: false
    })
  },
  // 输入框和按钮样式控制 ----------end-------
  
  
  // 删除
  delete:function (e) {
    wx.showModal({
      title: 'delete' + e.currentTarget.dataset.msg ,
      mask:true,
      duration:1000,
      success:function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var todolist = this.data.list
          todolist.forEach(i => {
            if (i.msg === e.currentTarget.dataset.msg) {
              var j = todolist.indexOf(i)
              todolist.splice(j,1)
            }
          })
          this.setData({
            list:todolist
          })
        }
      }.bind(this)
    })
  },
  start:function(e){

  },
  // todolist状态改变
  change: function (e) {
    var todolist = this.data.list
    var checkArr = e.detail.value
    console.log(checkArr)
    todolist.forEach(function (i) {
      if (checkArr.indexOf(i.msg + "") != -1) {
        i.isFinish = true
      } else {
        i.isFinish = false
      }
    })
    this.setData({
      list: todolist
    })
  },

  onLoad:function () {
    // 获取用户信息
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
    






})
