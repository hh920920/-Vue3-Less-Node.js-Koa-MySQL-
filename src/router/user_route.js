const Router = require('koa-router')

const {
    register,
    login,
    refreshToken,
    getUserInfo,
    updateName,
    updateSex,
    updateBirthday,
    updatePassword,
    getSysMessage,
    getUserCollect,
    addUserCollect,
    addUserCar,
    getUserCartList
} = require('../controller/user_controller')


// 导入中间件
const {
    validator, // 验证邮箱格式
    verifyEmailAccount, // 判断邮箱账号是否存在并且已激活
    brcyptPassword, // 加密密码
    emailAccountActivate, // 邮箱账号激活
    userVerify,   // 验证登录账号密码
} = require('../middleware/User_middleware')

const { auth } = require('../middleware/Auth.middleware')

const router = new Router({
    prefix: '/user'
})


// 用户注册
router.post('/register', validator, verifyEmailAccount, brcyptPassword, register)

// 用户激活
router.get('/activate', emailAccountActivate)

// 激活成功后渲染html页面
router.get('/account/active',async (ctx)=>{
    await ctx.render('index')
})

// 用户登录
router.post('/login', validator, userVerify, login)

// 刷新token接口
router.post('/refreshToken', auth, refreshToken)

// 获取用户信息
router.post('/info', auth, getUserInfo)

// 修改用户名
router.put('/updateName', auth, updateName)

// 修改用户性别
router.put('/updateSex', auth, updateSex)

// 修改用户生日
router.put('/updateBirthday', auth, updateBirthday)

// 修改用户密码
router.put('/updatePassword', auth, brcyptPassword, updatePassword)

// 获取系统消息通知
router.get('/sysMessage', getSysMessage)

// 添加收藏商品
router.post('/collect', auth, addUserCollect)

// 获取用户收藏商品列表
router.get('/collect', auth, getUserCollect)

// 添加购物车
router.post('/cart', auth, addUserCar)

// 获取用户购物车列表
router.get('/cart', auth, getUserCartList)



module.exports = router