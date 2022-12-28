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
            msg: '操作成功',
            result: res
        }
    }

    // 获取顶级类目信息（children属性就是各个子分类）
    async getTopCategory(ctx, next) {
        const { id } = ctx.request.query
        // let result = await getTopCategory( )
        // 返回结果
        if (!isNaN(id)) {
            const res = await getTopCategory(parseInt(id))
            ctx.body = {
                code: 200,
                message: 'success',
                result: res
            }
        } else {
            ctx.body = {
                code: 0,
                message: '参数错误',
                result: ''
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
                code: 0,
                message: '参数错误',
                result: ''
            }
        }
    }

    // 获取二级类下目的商品
    async getCategoryGoods(ctx, next) {
        const data = ctx.request.body
        const page = parseInt(data.page)
        const pageSize = parseInt(data.pageSize)
        const categoryId = parseInt(data.categoryId)
        let startPage = 0

        if (!isNaN(page) && !isNaN(pageSize) && !isNaN(categoryId)) {
            if (page > 1) startPage = (page - 1) * pageSize
            const { count, rows } = await getCategoryGoods(startPage, pageSize, categoryId)
            ctx.body = {
                code: 0,
                msg: 'success',
                counts: count, // 总条数
                pages: Math.round(count / pageSize), // 总页数
                page: page, // 起始页
                pageSize: pageSize, // 每页条数
                items: rows // 商品数据
            }

        } else {
            ctx.body = {
                code: 0,
                message: '参数错误',
                result: ''
            }
        }

    }

}


module.exports = new CategoryController()