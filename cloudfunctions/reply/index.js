const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();

    await cloud.openapi.customerServiceMessage.send({
        touser: wxContext.OPENID,
        msgtype: 'text',
        text: {
            content: '你个曾憨憨0.0',
        },
    })

    return 'success';
}
