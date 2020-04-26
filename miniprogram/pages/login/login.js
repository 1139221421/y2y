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
        login_logo: '../../images/logo.png',
        hidden: true
    },
    /**
     * 授权登录
     */
    login() {
        // 调用云函数获取Openid
        wx.showLoading();
        wx.cloud.callFunction({
            name: 'login',
            data: {}
        }).then(res => {
            app.globalData.openid = res.result.openid;
            this.getDbUser(user => {
                if (user) {
                    this.updateLoginTime(user);
                } else {
                    // 未注册用户
                    this.setData({hidden: false});
                    wx.hideLoading();
                }
            });
        })
    },
    getDbUser(callback) {
        db.collection('users').get().then(res => {
            callback(res.data && res.data.length > 0 ? res.data[0] : null);
        })
    },
    updateLoginTime(user) {
        // 更新用户登录时间
        db.collection('users').doc(user._id)
            .update({data: {lastLoginTime: new Date()}})
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
    },
    /**
     * 获取用户信息 并注册
     */
    getUserInfo(res) {
        wx.showLoading({title: '正在登录中...'});
        this.reg(res.detail.userInfo);
    },
    /**
     * 授权并注册注册
     */
    reg(user) {
        // 注册时再验证用户是否存在 避免多次创建
        this.getDbUser(u => {
            if (u) {
                this.updateLoginTime(u);
            } else {
                user.createTime = new Date();
                user.lastLoginTime = new Date();
                db.collection('users').add({
                    data: user
                }).then(res => {
                    user._id = res._id;
                    this.loginSuccess(user);
                }, fail => {
                    wx.hideLoading();
                    wx.showToast({
                        title: '登录失败',
                        icon: 'none'
                    })
                })
            }
        });
    },
    loginSuccess(user) {
        app.globalData.userInfo = user;
        wx.hideLoading();
        this.toIndex();
    },
    toIndex() {
        wx.switchTab({url: '/pages/index/index'});
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.openid && app.globalData.userInfo) {
            // 登录状态
            this.toIndex();
        } else {
            this.login();
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
