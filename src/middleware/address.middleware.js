const {
    addressFormatError
} = require('../constant/err.type')

// 闭包
const validator = (rules) => {
    return async (ctx, next) => {
        try {
            // verifyParams 是 koa-parameter里面的一个函数，用来校验
           
            ctx.verifyParams(rules)
        } catch (err) {
            // console.error(err)
            addressFormatError.result = err
            ctx.body = addressFormatError
            return
            // return ctx.app.emit('error', addressFormatError, ctx)
        }

        await next()
    }
}

module.exports = {
    validator,
}