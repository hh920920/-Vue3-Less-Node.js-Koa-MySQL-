const Router = require('koa-router')

const {
    getCategory,
    getTopCategory,
    getCategorySpecs,
    getCategoryGoods
} = require('../controller/category_controlle')

// 导入中间件
const {
    id_parameter_error,
    category_goods_validator
} = require('../middleware/Category_middleware')

const router = new Router({
    prefix: '/category'
})


// 获取顶级类目信息（children属性就是各个子分类）
router.get('/', id_parameter_error, getTopCategory)

// 获取所有分类（顶级，二级，对应的商品推荐数据）
router.get('/head', getCategory)

// 获取二级类下目的分类规格信息
router.get('/sub/filter',id_parameter_error, getCategorySpecs)

// 获取二级类下目的分类商品
router.get('/goods/temporary', category_goods_validator, getCategoryGoods)



module.exports = router