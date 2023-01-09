const Router = require('koa-router')

const {
    getGoods,
    getGoodsDetails,
    goodsConditionSort,
    getGoodsRecommend
} = require('../controller/goods_controlle')

// 导入中间件
const {
    goodsid_parameter_error,
    goodsSort_parameter_error
} = require('../middleware/Goods_middleware')

const router = new Router({
    prefix: '/goods'
})


// 获取商品具体信息
router.get('/', goodsid_parameter_error, getGoods)

// 获取商品详情信息
router.get('/details', goodsid_parameter_error, getGoodsDetails)

// 商品条件排序
router.get('/sort', goodsSort_parameter_error, goodsConditionSort)

// 商品推荐
router.get('/relevant', getGoodsRecommend)


module.exports = router