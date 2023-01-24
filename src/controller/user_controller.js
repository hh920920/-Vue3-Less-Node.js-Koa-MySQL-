const {
    createUser
} = require('../service/user_service')

const {
    userRegisterError
} = require('../constant/err.type')

const sendEmail = require('../utils/email')

const jwt = require('jsonwebtoken')

const {
    JWT_SECRET
} = require('../config/config_default')

class UserController {
    async register(ctx, next) {
        const {
            email,
            user_name,
            password
        } = ctx.request.body

        // // 注册激活的token
        const activateToken = jwt.sign({ email: email }, JWT_SECRET, {
            // expiresIn: 以秒或描述时间跨度zeit/ms的字符串表示。 例如：60, "2 days", "10h", "7d".
            // 数值被解释为秒数。如果您使用字符串，请确保提供时间单位（天、小时等），否则默认使用毫秒单位（"120"等于"120ms"）
            expiresIn: '60000'
        })
        // 邮箱激活链接模板
        const mail = {
            // 发件人
            from: '1414287034@qq.com',
            // 主题
            subject: '小熊猫注册激活验证',
            // 收件人
            to: email,
            // 邮件内容，HTML格式
            text: `尊敬的${user_name}，您好！点击链接即可激活您的账号,<a href='http://localhost:3000/user/activate?activateToken=${activateToken}'>立即激活</a> <br/>请在2小时内激活，您也可以将链接：http://localhost:3000/user/activate?activateToken=${activateToken}<br/>复制到浏览器地址栏访问。` //接收激活请求的链接
        }
        
        try {
            // 把用户信息存进数据库表
            const res = await createUser(email, user_name, password)
            if (res) {
                // 发送邮件
                sendEmail(mail)
                ctx.body = {
                    code: 0,
                    message: '注册成功，我们已经向您的邮箱发送一封激活邮件，激活后才能登录'
                }
            }
            
        } catch (err) {
            console.error(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    async login(ctx, next) {
    //     const {
    //         user_name
    //     } = ctx.request.body

    //     // 获取用户信息（在token的playlaod中，记录id,user_name,is_admin)
    //     try {
    //         // 从返回结果对象中 解构password，将剩余对象放进 res中   相当于剔除掉password
    //         // const {
    //         //     password,
    //         //     ...res
    //         // } = await getUserInfo({
    //         //     user_name
    //         // })
    //         const res = ctx.request.body
    //         ctx.body = {
    //             code: 0,
    //             message: '用户登录成功',
    //             result: {
    //                 token: jwt.sign(res, JWT_SECRET, {
    //                     // expiresIn: 以秒或描述时间跨度zeit/ms的字符串表示。 例如：60, "2 days", "10h", "7d".
    //                     // 数值被解释为秒数。如果您使用字符串，请确保提供时间单位（天、小时等），否则默认使用毫秒单位（"120"等于"120ms"）
    //                     expiresIn: '60000'
    //                 })
    //             },
    //         }
    //     } catch (error) {
    //         console.error('用户登录失败', error)
    //     }

    //     // ctx.body = `欢迎回来,${user_name}`
    }

    // async changePassword(ctx, next) {
    //     // 获取token中用户的id
    //     const id = ctx.state.user.id
    //     // 获取客户端传过来的密码
    //     const password = ctx.request.body.password
    //     if (await updateById({
    //             id,
    //             password
    //         })) {
    //         console.log('密码修改成功 —— id：' + id, password)
    //         ctx.body = {
    //             code: 0,
    //             message: '密码修改成功',
    //             result: ''
    //         }
    //     } else {
    //         ctx.app.emit('error', updatePassordError, ctx)
    //     }

    // }
}
// 类不能直接导出，所以转化为导出实例化对象
module.exports = new UserController()