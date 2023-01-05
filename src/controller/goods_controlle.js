const {
    getGoodsInfo,
    goodsSort,
    getGoodsRecommend
} = require('../service/goods/goodsInfo_service')
const { getGoodsDetails } = require('../service/goods/goodsDetails_service')

class GoodsController {
    // 获取商品及sku等其他信息
    async getGoods(ctx, next) {
        const { goods_id } = ctx.request.query
        // 返回结果
        if (!isNaN(goods_id)) {
            const res = await getGoodsInfo(parseInt(goods_id))
            ctx.body = {
                code: 0,
                message: 'success',
                result: res
            }
        } else {
            ctx.body = {
                code: 1,
                message: '参数错误',
                result: ''
            }
        }
    }

    // 获取商品详情信息
    async getGoodsDetails(ctx, next) {
        const { goods_id } = ctx.request.query
        // 返回结果
        if (!isNaN(goods_id)) {
            const { result, res } = await getGoodsDetails(parseInt(goods_id))
            ctx.body = {
                code: 0,
                message: 'success',
                result: [{
                        pictures: res
                    },
                    {
                        properties: result
                    }
                ]
            }
        } else {
            ctx.body = {
                code: 1,
                message: '参数错误',
                result: ''
            }
        }
    }

    // 商品条件排序
    async goodsConditionSort(ctx, next) {
        const { children_id, condition, sort } = ctx.request.query
        // let offset = 0  // 第N条开始
        // let limit = parseInt(pageSize)  // 每页条数
        if (children_id != '' && condition != '' && sort != '') {
            // if (page > 1) {
            //     offset = (page - 1) * limit
            // }
            const resullt = await goodsSort(parseInt(children_id), condition, sort)
            ctx.body = {
                code: 0,
                message: 'success',
                // counts: count,
                // page: parseInt(page),
                // pages: Math.ceil(count / pageSize),
                // pageSize: parseInt(pageSize),
                result: resullt
            }
        } else {
            ctx.body = {
                code: 1,
                message: 'error',
                result: '参数错误'
            }
        }
    }

    // 商品推荐
    async getGoodsRecommend(ctx, next) {
        // 返回结果
        const res = await getGoodsRecommend()
        ctx.body = {
            code: 0,
            message: 'success',
            result: res
        }
    }
}

module.exports = new GoodsController()