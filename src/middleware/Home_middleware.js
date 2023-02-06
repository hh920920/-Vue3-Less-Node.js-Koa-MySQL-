/**
 * 首页模块中间件  
 */

 const {
    parameterError,
    parameterFormatError
} = require('../constant/err.type')

class Home_middleware {
    // 判断首页品牌参数是否错误
    async parameter_error (ctx, next) {
        const { limit } = ctx.request.query
        try {
            // 如果参数错误
            if (limit === undefined) {
                console.error(parameterError)
                ctx.body = parameterError
                return
            }
            // 如果参数为空或格式不是int类型
            if (isNaN(limit) || limit === '') {
                console.error(parameterFormatError)
                ctx.body = parameterFormatError
                return
            }
        } catch (error) {
            console.error(err)
        }
        await next()
    }
}


module.exports = new Home_middleware()