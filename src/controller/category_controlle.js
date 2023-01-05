const {
    getCategory,
    getTopCategory,
    getCategorySpecs,
    getCategoryGoods
} = require('../service/category_service')


class CategoryController {
    // 获取所有分类（顶级，二级，对应的商品推荐数据）
    async getCategory(ctx, next) {
        let res = await getCategory()
        ctx.body = {
            code: 0,
            msg: '操作成功',
            result: res
        }
    }

    // 通过一级分类id获取二级分类信息（children属性就是各个子分类）
    async getTopCategory(ctx, next) {
        const { id } = ctx.request.query
        // 返回结果
        if (!isNaN(id)) {
            const res = await getTopCategory(parseInt(id))
            ctx.body = {
                code: 0,
                message: 'success',
                result: res
            }
        } else {
            ctx.body = {
                code: 1,
                message: 'error',
                result: '参数错误'
            }
        }
    }


    // 获取二级类下目的分类规格信息
    async getCategorySpecs(ctx, next) {
        const { id } = ctx.request.query
        // let result = await getTopCategory( )
        // 返回结果
        if (!isNaN(id)) {
            const res = await getCategorySpecs(parseInt(id))
            ctx.body = {
                code: 0,
                message: 'success',
                result: res
            }
        } else {
            ctx.body = {
                code: 1,
                message: 'error',
                result: '参数错误'
            }
        }
    }

    // 获取二级类下目的分类商品
    async getCategoryGoods(ctx, next) {
        const info = ctx.request.query
        const id = parseInt(info.categoryId)
        const page = parseInt(info.page)
        const pageSize = parseInt(info.pageSize)
        let startPage = 0
        let offset = 0
        // 返回结果
        if (!isNaN(id) && !isNaN(page) && !isNaN(pageSize)) {
            if (page > 1) {
                startPage = page > 1 ? page : 0
                offset = (startPage - 1) * pageSize
            }
            const { count, rows } = await getCategoryGoods(id, offset, pageSize)
            ctx.body = {
                code: 0,
                message: 'success',
                counts: count,
                page: page,
                pages: Math.ceil(count / pageSize),
                pageSize: pageSize,
                result: rows
            }
        } else {
            ctx.body = {
                code: 1,
                message: 'error',
                result: '参数错误'
            }
        }
    }

}


module.exports = new CategoryController()