const app = getApp();

// components/header/header.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: ''
        },
        // 左边 icon，默认为左箭头图标
        icon: {
            type: String,
            value: 'arrow-left'
        },
        // 是否自定义 icon
        customIcon: {
            type: Boolean,
            value: false
        },
        // 背景色
        background: {
            type: String,
            value: '#fff'
        },
        //字体颜色
        color: {
            type: String,
            value: '#000'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        windowWidth: app.globalData.systemInfo.windowWidth,
        statusBarHeight: app.globalData.statusBarHeight,
        menuButton: app.globalData.menuButton,
        headerStyle: '',
        iconStyle: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 初始化样式
        initStyle() {
            let headerStyle = {
                "height": this.data.menuButton.height + 'px',
                "padding-top": this.data.menuButton.top + 'px',
                "padding-bottom": this.data.menuButton.top - this.data.statusBarHeight + 'px',
                "background": this.data.background,
                "color": this.data.color
            }
            let iconStyle = {
                "top": `calc(${this.data.menuButton.height / 2 + this.data.menuButton.top}px)`
            };
            this.setData({
                headerStyle: this.objToStr(headerStyle),
                iconStyle: this.objToStr(iconStyle)
            })
        },
        iconHandler() {
            if (this.properties.icon === 'arrow-left') {
                wx.navigateBack({delta: 1})
            } else if (this.properties.icon === 'home') {
                wx.switchTab({url: '/pages/index/index'})
            } else {
                this.triggerEvent('click-icon', {}, {bubbles: true})
            }
        },
        // 工具：对象转字符串
        objToStr(obj, split = ';') {
            let str = '';
            for (let key in obj) {
                str += `${key}: ${obj[key]}${split};`;
            }
            return str;
        }
    },
    lifetimes: {
        attached() {
            this.initStyle();
        }
    }
})
