// 1、导入路由
const Router = require('koa-router')

const {
    auth,
} = require('../middleware/Auth.middleware')

const {
    validator
} = require('../middleware/address.middleware')

const {
    create,
    getAddress,
    update,
    remove,
    setDefault,
} = require('../controller/address_controlle')


// 2、实例化
const router = new Router({
    prefix: '/address'
})


// 添加收货地址
router.post('/', auth, validator({
    name: 'string', // 收货人姓名
    region: 'string', // 收货人
    detailedly: 'string', // 详情地址
    postcode: 'string', // 邮编
    phone: {     // 收货人电话 
        type: 'string',
        format: /^1\d{10}$/
    }
}), create)

// 获取收货地址
router.get('/', auth, getAddress)

// 修改收货地址
// router.put('/:id', auth, validator({
//     consignee: 'string', // 收货人
//     phone: {
//         type: 'string',
//         format: /^1\d{10}$/
//     },
//     address: 'string'
// }), update)

// 删除收货地址
router.delete('/:id', auth, remove)

// 设置默认收货地址
router.put('/:id', auth, setDefault)

module.exports = router