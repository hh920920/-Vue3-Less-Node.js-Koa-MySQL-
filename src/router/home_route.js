const Router = require('koa-router')

const {
    brand,
    banner,
    freshGood,
    hot,
    special
} = require('../controller/home_controlle')


const router = new Router({
    prefix: '/home'
})

// 首页品牌
router.get('/brand', brand)

// 首页轮播图
router.get('/banner', banner)

// 首页新鲜好物
router.get('/freshGood', freshGood)

// 首页人气推荐
router.get('/hot', hot)

// 首页最新专题
router.get('/special', special)


module.exports = router