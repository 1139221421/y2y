const app = getApp();
const db = wx.cloud.database();

Page({
    data: {
        scrollHeight: 0, // 滚动屏的高度
        refresherTriggered: false,
        loading: false,
        list: [],
        listLen: 0,
        loginState: !!app.globalData.openid
    },
    // 加载触发
    onLoad: function () {
        this.login(() => {
            this.initStyle();
            this.init();
        });
    },
    initStyle() {
        // 设置内容高度
        this.setData({
            scrollHeight: app.globalData.systemInfo.screenHeight - 200 * app.globalData.rpx
        });
    },
    init() {
        this.setData({
            loading: true,
        })
        db.collection('test').get().then(res => {
            this.setData({list: res.data});
            this.setData({
                refresherTriggered: false,
                listLen: res.data.length,
                loading: false,
            })
        })
    },
    // 点击分享按钮
    onShareAppMessage(e) {
        wx.showShareMenu({
            withShareTicket: true,
            success: suc => {
                console.log('分享成功', suc);
            },
            fail: re => {
            }
        })
        return {
            title: '分享后',
            path: '/pages/index/index'
        }
    },
    // 刷新
    onRefresh(e) {
        this.init();
    },
    onLoadMore(e) {
        setTimeout(() => {
            this.setData({
                listLen: 0,
                loading: false,
            })
        }, 2000)
    },
    /**
     * 授权登录
     */
    login(callback) {
        // 调用云函数获取Openid
        wx.showLoading({title: '正在登录中...'})
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
                        .update({data: {lastLoginTime: new Date()}})
                        .then(
                            res => {
                                this.loginSuccess(user, callback);
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
                    this.reg(openid, callback);
                }
            })
        })
    },
    /**
     * 注册
     */
    reg(openid, callback) {
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
                                this.loginSuccess(user, callback);
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
    loginSuccess(user, callback) {
        app.globalData.openid = user._openid;
        app.globalData.userInfo = user;
        wx.hideLoading();
        this.setData({loginState: true});
        callback();
    },
})
