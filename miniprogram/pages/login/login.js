//获取应用实例
const app = getApp()
const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    login_bg: '../../images/bg.jpg',
    login_logo: '../../images/logo.png'
  },
  /**
   * 授权登录
   */
  login() {
    // 调用云函数获取Openid
    wx.showLoading({ title: '正在登录中...' })
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then(res => {
      let openid = res.result.openid;
      db.collection('users').where({
        _openid: openid
      }).get().then(res => {
        let user = res.data && res.data.length > 0 ? res.data[0] : null;
        if (user) {
          // 更新用户登录时间
          db.collection('users').doc(user._id)
            .update({ data: { lastLoginTime: new Date() } })
            .then(
              res => {
                this.loginSuccess(user);
              },
              fail => {
                wx.hideLoading();
                wx.showToast({
                  title: '登录失败',
                  icon: 'none'
                })
              })
        } else {
          // 未注册用户
          this.reg(openid);
        }
      })
    })
  },
  /**
   * 注册
   */
  reg(openid) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              let user = res.userInfo;
              user.createTime = new Date();
              user.lastLoginTime = new Date();
              db.collection('users').add({
                data: user
              }).then(res => {
                user._id = res._id;
                user._openid = openid;
                this.loginSuccess(user);
              }, fail => {
                wx.hideLoading();
                wx.showToast({
                  title: '登录失败',
                  icon: 'none'
                })
              })
            }
          })
        }
      }
    })
  },
  loginSuccess(user) {
    app.globalData.openid = user._openid;
    app.globalData.userInfo = user;
    wx.hideLoading();
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      // 登录中
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
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
    //判断是否在登录态，若在跳往首页

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
