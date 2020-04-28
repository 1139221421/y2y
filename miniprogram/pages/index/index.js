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
            {text: '编辑', icon: 'icon-fabu', done: 'handleEdit'},
            {text: '分享', icon: 'icon-share', done: 'handleShare'},
            {text: '删除', icon: 'icon-shanchu', done: 'handleDel', disabled: true}
        ],
        top: app.globalData.navigateHeaderHeight + 'px',
        types: [
            {_id: '1', name: '分类1', active: true},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '2', name: '分类2'},
            {_id: '3', name: '分类3'}
        ]
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
    // 底部弹出框点击操作
    clickOperator(e) {
        this[e.detail.done]();
    },
    showPopup() {
        this.setData({
            showPopup: true,
        });
    },
    closeLeftBar() {
        this.setData({
            showPopup: false,
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
    },
    itemClick(e) {
        let index = e.currentTarget.id;
        for (let i = 0; i < this.data.types.length; i++) {
            this.setData({
                ["types[" + i + "].active"]: (index == i)
            });
        }
        let id = this.data.types[index]._id;
        console.log(id);
    }
})
