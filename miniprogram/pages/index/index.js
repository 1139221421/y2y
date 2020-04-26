const app = getApp();
const db = wx.cloud.database();

Page({
    data: {
        scrollHeight: 0, // 滚动屏的高度
        refresherTriggered: false,
        loading: false,
        list: [],
        listLen: 0,
        showPopup: false,
        operatorList: [
            { text: '编辑', icon: 'icon-fabu', done: 'handleEdit' },
            { text: '分享', icon: 'icon-share', done: 'handleShare' },
            { text: '删除', icon: 'icon-shanchu', done: 'handleDel', disabled: true }
        ],
    },
    // 加载触发
    onLoad: function () {
        this.initStyle();
        this.init();
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
            this.setData({ list: res.data });
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
    // 底部弹出框点击操作
    clickOperator(e) {
        this[e.detail.done]();
    },
    showPopup() {
        this.setData({
            showPopup: true,
        });
    },
    handleEdit() {
        console.log('edit');
    },
    handleShare() {
        console.log('share');
    },
    handleDel() {
        console.log('del');
    }
})
