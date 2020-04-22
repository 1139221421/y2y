const app = getApp();

Page({
    data: {
        searchViewTop: app.globalData.navigateHeaderHeight, // 搜索栏的top
        scrollHeight: 0, // 滚动屏的高度
        refresherTriggered: false, // 下拉刷新状态
        // 总数统计
        totalList: {
            activity: {text: '11', color: '#4CBFD0'},
            form: {text: '22', color: '#F9CC46'},
            information: {text: '33', color: '#51BA89'},
        }
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
    },
    onLoadMore(e) {
    }
})
