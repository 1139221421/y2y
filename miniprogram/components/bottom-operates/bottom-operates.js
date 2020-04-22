Component({
  options: {
    styleIsolation: 'shared'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示弹框
    show: {
      type: Boolean,
      value: false
    },
    // 弹框标题
    title: {
      type: String,
      value: ''
    },
    unitId: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    // 操作列表，属性：text、icon、done
    list: {
      type: Array,
      value: []
    },
    // z-index
    zIndex: {
      type: Number,
      value: 200
    },
    // 弹出框的位置
    position: {
      type: String,
      value: 'bottom'
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
    // 隐藏弹框
    closePopup () {
      this.setData({ show: false });
    },
    clickItem (e) {
      let index = e.currentTarget.dataset.index;
      let item = this.properties.list[index];
      if (item.disabled) {
        wx.showToast({ title: item.disabledText || '该功能还未开通', icon: 'none' });
        return;
      }
      // this.closePopup();
      this.triggerEvent('click-item', {done: item.done}, {bubbles: true})
    }
  },

  observers: {
    'title' (value) {
      let reg = /<\/?.+?>/g;
      if (value && reg.test(value)) {
        this.setData({
          title: value.replace(reg, '')
        })
      }
    }
  }
})
