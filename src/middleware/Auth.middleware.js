const jwt = require('jsonwebtoken')
const {
    JWT_SECRET
} = require('../config/config_default')

const {
    TokenExpiredError,
    invalidToken,
    hasNotAdminPermission
} = require('../constant/err.type')

const auth = async (ctx, next) => {
    const {
        authorization = ''
    } = ctx.request.header

    const token = authorization.replace('Bearer', '')
    try {
        // 需要token验证的接口，则通过jwt.verify()验证token的有效性
        const user = jwt.verify(token, JWT_SECRET)
        // ctx.state.user = user
        console.log(user.exp);
        console.log(new Date().getTime());
    } catch (error) {
        console.log(error);
        switch (error.name) {
            case 'TokenExpiredError':
                console.error('token已过期', error)
                return ctx.app.emit('error', TokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', error)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }

    await next()
}

// 验证管理员权限
const hadAdminPermission = async (ctx, next) => {
    const {
        is_admin
    } = ctx.state.user
    // 如果非管理员
    if (!is_admin) {
        console.error('该用户没有管理员的权限', ctx.state.user)
        return ctx.app.emit('error', hasNotAdminPermission, ctx)
    }

    await next()
}


module.exports = {
    auth,
    hadAdminPermission
}