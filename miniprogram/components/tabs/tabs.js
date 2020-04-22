// components/tabs/tabs.js
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
    // 当前 tab 索引
    currentTabIndex: {
      type: Number,
      value: 0
    },
    // tab 列表
    tabList: {
      type: Array,
      value: []
    },
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
    // 滚动屏的 paddingBottom
    paddingBottom: {
      type: String,
      value: '50px'
    },
    // 滚动屏的 top
    top: {
      type: String,
      value: '100rpx'
    },
    // 是否在加载中（传给scroll组件）
    isLoading: {
      type: Boolean,
      value: true
    },
    // 是否还有数据（传给scroll组件）
    hasMore: {
      type: Boolean,
      value: true
    },
    // 是否显示更多（传给scroll组件）
    isShowMore: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // tab切换
    onTabChange (e) {
      this.triggerEvent('tab-change', {...e.detail}, {bubbles: true});
    },
    // 下拉触发
    onPulling() {
      this.triggerEvent('pulling', {}, { bubbles: true });
    },
    // 复位触发
    onRestore() {
      this.triggerEvent('restore', {}, { bubbles: true });
    },
    // 中止触发
    onAbort() {
      this.triggerEvent('abort', {}, { bubbles: true });
    },
    // 刷新
    onRefresh(e) {
      this.triggerEvent('refresh', {}, { bubbles: true });
    },
    // 加载更多
    onLoadMore() {
      this.triggerEvent('load-more', {}, { bubbles: true });
    },
  }
})
