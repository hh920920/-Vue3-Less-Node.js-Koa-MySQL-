// 路由统一加载

const fs = require('fs')

const Router = require('koa-router')
const router = new Router()

// 获取router文件下的所有路由js，然后导出到app/index中统一挂载
fs.readdirSync(__dirname).forEach(file => {
    // console.log(file)
    if (file !== 'index.js') {
        let r = require('./' + file)
        // console.log(r.routes())
        router.use(r.routes())
    }
})

module.exports = router