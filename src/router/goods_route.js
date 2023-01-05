const Router = require('koa-router')

const {
    getGoods,
    getGoodsDetails,
    goodsConditionSort,
    getGoodsRecommend
} = require('../controller/goods_controlle')

const router = new Router({
    prefix: '/goods'
})


// 获取商品具体信息
router.get('/', getGoods)

// 获取商品详情信息
router.get('/details', getGoodsDetails)

// 商品条件排序
router.get('/sort', goodsConditionSort)

// 商品条件排序
router.get('/relevant', getGoodsRecommend)


module.exports = router