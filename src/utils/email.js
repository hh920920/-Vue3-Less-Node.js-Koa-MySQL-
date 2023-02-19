const nodemailer = require('nodemailer')

const config = {
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth: {
        user: '1414287034@qq.com',
        pass: 'jusdfdsfdsfdfhcv'  // 邮箱POP3/SMTP服务 授权码
    },
}


// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);
// 发送邮件
module.exports = function(mail) {
    transporter.sendMail(mail, function(error, info) {
        if (error) {
            return console.log(error)
        }
        console.log('mail sent:', info.response)
    })
}
