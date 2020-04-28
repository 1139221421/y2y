// miniprogram/pages/user/user.js
const app = getApp();
const db = wx.cloud.database();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        actionList: [
            {name: '我的关注', icon: 'like', url: '/pages/info/info'},
            {name: '我的消息', icon: 'chat', url: '/pages/info/info'},
            {name: '浏览记录', icon: 'underway', url: '/pages/info/info'},
            {name: '设置', icon: 'setting', url: '/pages/info/info'}
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({userInfo: app.globalData.userInfo})
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
    onShareAppMessage: function (e) {
        // return {
        //     title: '分享测试',
        //     path: '/pages/user/user',
        //     imageUrl: '../../images/user-default.jpg'
        // }
    },
    handleContact(e) {
        console.log(e.detail)
    },
    getUserInfo(e) {
        this.setData({userInfo: e.detail.userInfo});
        db.collection('users').where({_openid: app.globalData.openid})
            .update({data: e.detail.userInfo})
            .then(res => {
                app.globalData.userInfo = e.detail.userInfo;
            })
    },
    toInfo() {
        wx.navigateTo({
            url: '/pages/info/info'
        })
    }
})
