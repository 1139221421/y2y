const app = getApp();

Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    active: {
      type: Number,
      value: 0
    },
    // 导航条数据
    navList: {
      type: Array,
      value: app.globalData.navList
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  methods: {
    onChange(event) {
      let index = event.currentTarget.dataset.index;
      this.triggerEvent('change-tab', { active: index }, { bubbles: true});
      // 跳转
      if (this.properties.navList[index].to) {
        wx.switchTab({
          url: this.properties.navList[index].to
        })
      }
    }
  }
})
