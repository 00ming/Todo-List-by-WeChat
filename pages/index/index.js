//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    focusFlag:false,
    inputValue: '',
    list: [
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
        isFinish: false,
        isImportant:false
      }
      todolist.push(newMsg)
      this.setData({
        list: todolist
      })
      this.save()
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
  
  start:function (e) {
    console.log(e.currentTarget.dataset.msg)
    var todolist = this.data.list;
    todolist.forEach(i => {
      if (i.msg === e.currentTarget.dataset.msg) {
        i.isImportant = !i.isImportant;
        return
      }
    })
    this.setData({
      list:todolist
    })
    this.save()

  },
  // 删除
  delete:function (e) {
    wx.showModal({
      title: 'delete' + e.currentTarget.dataset.msg ,
      mask:true,
      duration:1000,
      success:function(res) {
        if (res.confirm) {
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
          this.save()
        }
      }.bind(this)
    })
  },

  // todolist状态改变
  change: function (e) {
    var todolist = this.data.list
    var checkArr = e.detail.value
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
    this.save()
  },

  save:function () {
    wx.setStorage({
      key: "save",
      data: this.data.list
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
    wx.getStorage({
      key: 'save',
      success: function (res) {
        console.log(res.data)
        this.setData({
          list: res.data
        })
      }.bind(this)
    })
  }
    






})
