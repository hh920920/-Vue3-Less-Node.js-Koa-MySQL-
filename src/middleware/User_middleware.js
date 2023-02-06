/**
 *  用户模块中间件  
 */

const {
    parameterError,
    userExist,
    userExistNotActivate,
    emailFormatError,
    userRegisterError,
    userDoesNotExist,
    invalidPassword,
    invalidUser
} = require('../constant/err.type')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const { JWT_SECRET } = require('../config/config_default')

const {
    findUser,
    updatedActivate,
    deleteUser
} = require('../service/user_service')
const email = require('../utils/email')
const { stringify } = require('querystring')

class User_middleware {
    // 注册时判断邮箱账号是否存在并且是否激活
    async verifyEmailAccount(ctx, next) {
        const { email } = await ctx.request.body
        try {
            const res = await findUser(email)
            // 如果用户存在，且已激活
            if (res && res.email_activate == 1) {
                console.error(userExist)
                ctx.body = userExist
                return
            }
            // 如果用户存在，但未激活
            if (res && res.email_activate == 0) {
                console.error(userExistNotActivate)
                ctx.body = userExistNotActivate
                return
            }

        } catch (error) {
            console.error(error)
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
            console.error(parameterError)
            ctx.body = parameterError
            return
        }
        try {
            ctx.verifyParams({ email: 'email' })
        } catch (error) {
            emailFormatError.result = error
            console.error(emailFormatError)
            ctx.body = emailFormatError
            return
        }
        await next()
    }
    // 账号激活
    async emailAccountActivate(ctx, next) {
        // 取出激活token
        const activateToken = ctx.request.url.slice(29)
        // 解析信息
        const jwtDecodeToken = jwt_decode(activateToken)
        const email = jwtDecodeToken.email
        try {
            // 1、验证激活token看是否在有效期内
            const user = jwt.verify(activateToken, JWT_SECRET)
            // 2、如果在有效期内，修改用户表激活状态，重定向登录页
            const res = await updatedActivate(email)
            // 激活成功，重定向登录页
            if (res[0] == 1) {
                ctx.redirect('/user/account/active')
            }
        } catch (error) {
            // 2、如果过期，删除表的记录，并返回提示让重新提交注册
            const res = await deleteUser(email)
            console.log(res);
            if (res > 0) {
                console.error(userRegisterError)
                ctx.body = userRegisterError
            }
            switch (error.name) {
                case 'TokenExpiredError':
                    console.error('激活时间过期', error)
                case 'JsonWebTokenError':
                    console.error('无效的激活验证', error)
            }
        }
        await next()
    }
    // 验证登录账号密码
    async userVerify(ctx, next) {
        const { email, password } = await ctx.request.body
        // 如果参数错误
        if ((email && password) === undefined) {
            ctx.app.emit('error', parameterError, ctx)
            return
        }
        try {
            // 验证密码格式是否正确
            ctx.verifyParams({
                password: {
                    type: 'string',
                    min: 6,
                    max: 15,
                    required: true
                }
            })
            const res = await findUser(email)
            // 如果账号不存在
            if (res == null) {
                console.error(userDoesNotExist)
                ctx.body = userDoesNotExist
                return
            }
            // 如果账号没激活
            if (res.email_activate == false) {
                console.error(userExistNotActivate)
                ctx.body = userExistNotActivate
                return
            }
            // 如果账号冻结
            if (res.user_activate == false) {
                console.error(invalidUser)
                ctx.body = invalidUser
                return
            }
            
            // 如果密码不匹配
            if (!bcrypt.compareSync(password, res.password)) {
                console.error(invalidPassword)
                ctx.body = invalidPassword
                return // 防止继续向下执行
            }

        } catch (error) {
            ctx.body = {
                code: '10005',
                message: error.errors[0].message,
                field: error.errors[0].field
            }
            return
        }
        await next()
    }
}


module.exports = new User_middleware()