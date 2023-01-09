const Router = require('koa-router')

const {
    brand,
    banner,
    freshGood,
    hot,
    special
} = require('../controller/home_controlle')

// 导入中间件
const {
    parameter_error
} = require('../middleware/Home_middleware')


const router = new Router({
    prefix: '/home'
})

// 首页品牌
router.get('/brand', parameter_error, brand)

// 首页轮播图
router.get('/banner', banner)

// 首页新鲜好物
router.get('/freshGood', parameter_error, freshGood)

// 首页人气推荐
router.get('/hot', hot)

// 首页最新专题
router.get('/special', parameter_error, special)


module.exports = router