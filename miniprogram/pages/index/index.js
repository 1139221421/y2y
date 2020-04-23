const app = getApp();

Page({
    data: {
        scrollHeight: 0, // 滚动屏的高度
        refresherTriggered: false,
        list: [1, 2, 3, 4, 5]
    },
    // 加载触发
    onLoad: function () {
        this.initStyle();
    },
    initStyle() {
        // 设置内容高度
        this.setData({
            scrollHeight: app.globalData.systemInfo.screenHeight - 200 * app.globalData.rpx
        });
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
        setTimeout(() => {
            this.setData({
                refresherTriggered: false,
            })
        }, 2000)
    },
    onLoadMore(e) {
    }
})
