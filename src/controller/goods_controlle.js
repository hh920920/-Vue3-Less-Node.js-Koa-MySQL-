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
        const res = await getGoodsInfo(parseInt(goods_id))
        if (res === false) {
            ctx.body = {
                code: -1,
                message: '商品id不存在'
            }
        } else {
            ctx.body = {
                code: 0,
                message: 'success',
                result: res
            }
        }
    }

    // 获取商品详情信息
    async getGoodsDetails(ctx, next) {
        const { goods_id } = ctx.request.query
        // 返回结果
        const { result, res, isGoods } = await getGoodsDetails(parseInt(goods_id))
        try {
            if (isGoods === null) {
                ctx.body = {
                    code: -1,
                    message: '商品id不存在',
                }
            } else {
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
            }
        } catch (error) {
            console.error(error)
        }
    }

    // 商品条件排序
    async goodsConditionSort(ctx, next) {
        const { children_id, condition, sort } = ctx.request.query
        // let offset = 0  // 第N条开始
        // let limit = parseInt(pageSize)  // 每页条数
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