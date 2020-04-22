Component({
    options: {
        // 在组件定义时的选项中启用多slot支持
        multipleSlots: true,
        styleIsolation: 'shared'
    },

    /**
     * 组件的属性列表
     */
    properties: {
        // 数据的长度
        listLen: {
            type: Number,
            value: []
        },
        // 没数据时展示的文本
        noResultText: {
            type: String,
            value: '没有更多数据了'
        },
        // 是否开启自定义没数据时的展示效果
        customNoResult: {
            type: Boolean,
            value: false
        },
        // 加载更多功能开关
        loadMoreEnable: {
            type: Boolean,
            value: true
        },
        // 下拉刷新功能开关
        refreshEnable: {
            type: Boolean,
            value: true
        },
        // 下拉刷新阈值
        refresherThreshold: {
            type: Number,
            value: 45
        },
        // 下拉刷新默认样式 black | white | none
        refresherDefaultStyle: {
            type: String,
            value: 'black'
        },
        // 下拉刷新区域颜色
        refresherBackground: {
            type: String,
            value: '#fff'
        },
        // 下拉刷新状态
        refresherTriggered: {
            type: Boolean,
            value: false
        },
        // 滚动屏高度
        scrollHeight: {
            type: Number,
            value: ''
        },
        // 滚动屏的 bottom
        bottom: {
            type: String,
            value: '100rpx'
        },
        // 滚动屏的 top
        top: {
            type: String,
            value: '100rpx'
        },
        // 是否在加载数据中
        isLoading: {
            type: Boolean,
            value: true
        },
        // 是否还有数据
        hasMore: {
            type: Boolean,
            value: true
        },
        // 是否显示更多
        isShowMore: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 滚动距离
        scrollTop: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 下拉触发
        onPulling(e) {
            console.log('下拉触发')
            if (this.data.listLen == 0) {
                this.setData({
                    refreshEnable: false,
                    refreshEnable: true,
                })
            }
            this.triggerEvent('pulling', {}, {bubbles: true});
        },
        // 复位触发
        onRestore(e) {
            console.log('复位触发')
            this.setData({
                refreshEnable: true,
            })
            this.triggerEvent('restore', {}, {bubbles: true});
        },
        // 中止触发
        onAbort(e) {
            console.log('中止触发')
            this.setData({
                refreshEnable: true,
            })
            this.triggerEvent('abort', {}, {bubbles: true});
        },
        // 刷新
        refresher(e) {
            console.log('刷新')
            this.triggerEvent('refresh', {}, {bubbles: true});
        },
        // 加载更多
        loadMore(e) {
            console.log('加载更多')
            if (this.data.loadMoreEnable) {
                console.log(e);
                // console.log(this.data.pageParams.currentPage);
                this.triggerEvent('load-more', {}, {bubbles: true});
            }
        },
        // 回到顶部
        goTop() {
            this.setData({scrollTop: 0});
        },
        // 回到底部
        goBottom() {
            this.setData({scrollTop: this.properties.scrollHeight * 2});
        }
    },

    /**
     * 生命周期
     */
    lifetimes: {
        attached() {
        },
        detached() {
        }
    }
})