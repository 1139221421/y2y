// pages/leftbar.js
Component({
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    userId: {
      type: Number,
      value: 0
    },
    info: {
      type: Object,
      value: {}
    },
    nickName: {
      type: String,
      value: "未获取"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    operatorList: [
      { text: '修改密码', icon: 'icon-mima', done: 'toUpdatePwd'},
      { text: '在线客服', icon: 'icon-dianhua', isOnlineServer: true},
      // { text: '帮助中心', icon: '', done: ''},
      // { text: '用户反馈', icon: '', done: ''},
      { text: '退出登录', icon: 'icon-tuichu', done: 'toExit'}
    ]
  },
  attached() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 去修改密码页
    toUpdatePwd () {
      wx.navigateTo({
        url: '/pages/update-pwd/update-pwd'
      })
      this.triggerEvent('close-left-bar', {}, {bubbles: true});
    },
    toExit() {

    },
    setUserInfo() {
    }
  }
})
