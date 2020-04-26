//app.js
App({
    onLaunch: function () {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                // env: 'my-env-id',
                traceUser: true,
            })

            try {
                this.globalData.systemInfo = wx.getSystemInfoSync();
                this.globalData.rpx = this.globalData.systemInfo.windowWidth / 750;
                this.globalData.statusBarHeight = this.globalData.systemInfo.statusBarHeight;
                let menuButton = this.globalData.menuButton = wx.getMenuButtonBoundingClientRect();
                this.globalData.navigateHeaderHeight = menuButton.top - this.globalData.statusBarHeight + menuButton.bottom;
            } catch (e) {
                console.log('初始化错误', e)
            }
        }
    },
    globalData: {
        userInfo: null,
        systemInfo: {},     // 系统信息
        rpx: 0,   // rpx转换为px的比例
        statusBarHeight: 0,
        menuButton: 0,
        navigateHeaderHeight: 64,   // 原生 header 的高度
        // 底部导航栏
        navList: [
            {icon: 'home-o', text: '首页', to: '/pages/index/index'},
            {icon: 'user-circle-o', text: '我的', to: '/pages/user/user'}
        ]
    }
})
