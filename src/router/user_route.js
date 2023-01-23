const Router = require('koa-router')

const {
    register,
    login
} = require('../controller/user_controller')

// 导入中间件
const {
    validator, // 验证邮箱格式
    verifyEmailAccount, // 判断邮箱账号是否存在并且已激活
    brcyptPassword, // 加密密码
    emailAccountActivate, // 邮箱账号激活
} = require('../middleware/User_middleware')

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
router.post('/login', login)


module.exports = router