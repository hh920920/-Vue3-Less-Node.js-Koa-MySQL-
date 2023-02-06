const jwt = require('jsonwebtoken')
const {
    JWT_SECRET
} = require('../config/config_default')

const {
    tokenExpiredError,
    invalidToken,
    refreshTokenError
} = require('../constant/err.type')

const { getString } = require('../utils/redis-client')
const jwt_decode = require('jwt-decode')

// 验证token
const auth = async (ctx, next) => {
    const {
        authorization = ''
    } = ctx.request.header

    const token = authorization.replace('Bearer ', '')

    // console.log(token);
    try {
        // 需要token验证的接口，则通过jwt.verify()验证token的有效性 
        jwt.verify(token, JWT_SECRET)
        // ctx.body = 'token验证通过'
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                // console.error('token已过期', error)
                return ctx.status = 401
            case 'JsonWebTokenError':
                // console.error('无效的token', error)
                return ctx.status = 301
        }
    }

    await next()
}

// 验证管理员权限
// const hadAdminPermission = async (ctx, next) => {
//     const {
//         is_admin
//     } = ctx.state.user
//     // 如果非管理员
//     if (!is_admin) {
//         console.error('该用户没有管理员的权限', ctx.state.user)
//         return ctx.app.emit('error', hasNotAdminPermission, ctx)
//     }

//     await next()
// }


module.exports = {
    auth
}