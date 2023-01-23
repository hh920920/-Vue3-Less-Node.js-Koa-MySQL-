/**
 *  用户模块中间件  
 */

const {
    parameterError,
    userExist,
    userExistNotActivate,
    emailFormatError,
} = require('../constant/err.type')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config_default')
const fs = require('fs')

const {
    findUser,
    updatedActivate
} = require('../service/user_service')
const email = require('../utils/email')

class User_middleware {
    // 判断邮箱账号是否存在并且是否激活
    async verifyEmailAccount(ctx, next) {
        const { email } = await ctx.request.body
        try {
            const res = await findUser(email)
            // 如果用户存在，且已激活
            if (res && res.email_activate == 1) {
                ctx.app.emit('error', userExist, ctx)
                return
            }
            // 如果用户存在，但未激活
            if (res && res.email_activate == 0) {
                ctx.app.emit('error', userExistNotActivate, ctx)
                return
            }

        } catch (error) {
            console.error(err)
        }
        await next()
    }
    // 注册密码加密
    async brcyptPassword(ctx, next) {
        const {
            password
        } = ctx.request.body

        // 加盐
        const salt = bcrypt.genSaltSync(10) // 10次加盐
        const hash = bcrypt.hashSync(password, salt)
        ctx.request.body.password = hash
        await next()
    }
    // 验证邮箱格式是否正确
    async validator(ctx, next) {
        const { email } = await ctx.request.body
        // 如果参数错误
        if (email === undefined) {
            ctx.app.emit('error', parameterError, ctx)
            return
        }
        try {
            ctx.verifyParams({ email: 'email' })
            // console.log('验证通过');
        } catch (error) {
            emailFormatError.result = error
            ctx.app.emit('error', emailFormatError, ctx)
            return
        }
        await next()
    }
    // 账号激活
    async emailAccountActivate(ctx, next) {
        // 取出激活token
        const activateToken = ctx.request.url.slice(29)
        // 1、验证激活token看是否在有效期内
        const user = jwt.verify(activateToken, JWT_SECRET)
        const email = user.email
        try {
            // 2、如果在有效期内，修改用户表激活状态，重定向登录页
            const res = await updatedActivate(email)
            // 激活成功，重定向登录页
            if (res[0] == 1) {
                ctx.redirect('/user/account/active')
            }
        } catch (error) {
            // 2、如果过期，删除表的记录，并返回提示让重新提交注册
            switch (error.name) {
                case 'TokenExpiredError':
                    console.error('token已过期', error)
                case 'JsonWebTokenError':
                    console.error('无效的token', error)
            }
        }
        await next()
    }
}


module.exports = new User_middleware()