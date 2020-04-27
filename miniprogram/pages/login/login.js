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
        wx.showLoading({title: '正在登录中...'});
        wx.cloud.callFunction({
            name: 'login',
            data: {}
        }).then(res => {
            this.getDbUser(user => {
                this.updateLoginTime(user);
            });
            app.globalData.openid = res.result.openid;
            wx.hideLoading();
            this.toIndex();
        })
    },
    getDbUser(callback) {
        db.collection('users').get().then(res => {
            callback(res.data && res.data.length > 0 ? res.data[0] : null);
        })
    },
    updateLoginTime(user) {
        // 更新用户登录时间
        if (user) {
            db.collection('users').doc(user._id)
                .update({data: {lastLoginTime: new Date()}})
                .then(res => {
                    app.globalData.userInfo = user;
                })
        } else {
            user = {createTime: new Date(), lastLoginTime: new Date()};
            db.collection('users').add({
                data: user
            }).then(res => {
                user._id = res._id;
                app.globalData.userInfo = user;
            })
        }
    },
    /**
     * 获取用户信息 并注册
     */
    getUserInfo(res) {
        let user = res.detail.userInfo;
    },
    toIndex() {
        wx.switchTab({url: '/pages/user/user'});
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.openid) {
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
