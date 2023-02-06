/**
 * 分类模块中间件  
 */

 const {
    parameterError,
    parameterFormatError
} = require('../constant/err.type')

class Category_middleware {
    // 判断id参数是否错误
    async id_parameter_error (ctx, next) {
        const { id } = ctx.request.query
        try {
            if (id === undefined) {
                console.error(parameterError)
                ctx.body = parameterError
                return
            }
             // 如果参数为空或格式不是int类型
             if (isNaN(id) || id === '') {
                console.error(parameterFormatError)
                ctx.body = parameterFormatError
                return
            }
        } catch (error) {
            console.error(err)
        }
        await next()
    }
    // 验证格式是否错误
    async category_goods_validator (ctx, next) {
        const { categoryId, page, pageSize } = ctx.request.query
        try {
            if ((categoryId && page && pageSize ) === undefined) {
                ctx.app.emit('error', parameterError, ctx)
                return
            }
            // 如果参数为空或格式错误
             if ((categoryId && page && pageSize) === '' || (isNaN(categoryId) || isNaN(page) || isNaN(pageSize)) ) {
                ctx.app.emit('error', parameterFormatError, ctx)
                return
            }
        } catch (error) {
            console.error(error)
        }
        await next()
    }
}


module.exports = new Category_middleware()