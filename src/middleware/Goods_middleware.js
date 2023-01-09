/**
 * 商品模块中间件  
 */

 const {
    parameterError,
    parameterFormatError
} = require('../constant/err.type')

class Goods_middleware {
    // 判断id参数是否错误
    async goodsid_parameter_error (ctx, next) {
        const { goods_id } = ctx.request.query
        try {
            if (goods_id === undefined) {
                ctx.app.emit('error', parameterError, ctx)
                return
            }
             // 如果参数为空或格式不是int类型
             if (isNaN(goods_id) || goods_id === '') {
                ctx.app.emit('error', parameterFormatError, ctx)
                return
            }
        } catch (error) {
            console.error(err)
        }
        await next()
    }
    // 商品排序参数是否正确
     async goodsSort_parameter_error (ctx, next) {
        const { children_id, condition, sort } = ctx.request.query
        try {
            if ((children_id && condition && sort) === undefined) {
                ctx.app.emit('error', parameterError, ctx)
                return
            }
            // 如果参数为空或格式错误
            if ((children_id && condition && sort) === '' || isNaN(children_id) ) {
                ctx.app.emit('error', parameterFormatError, ctx)
                return
            }
        } catch (error) {
            console.error(err)
        }
        await next()
    }
}


module.exports = new Goods_middleware()