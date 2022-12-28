const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')

const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

const errHandler = require('./errHandler')
// 导入路由
const router = require('../router')

const app = new Koa()
// KoaBody 支持文件上传
app.use(
    KoaBody({
        multipart: true,
        formidable: {
            // 在配置选项option里，不推荐使用相对路径  不能'../upload'
            // 因为它不是相对当前文件，而是相对process.cwd()
            // 用绝对路径比较好点
            uploadDir: path.join(__dirname, '../src/upload'),
            keepExtensions: true,
            uploadDir: path.join(__dirname, '../upload'),
            keepExtensions: true,
        },
        parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
    })
)

// 跨域设置
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'content-type')
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE')
    await next()
    // 允许所有跨域
    if (ctx.request.method === 'OPTIONS') {
      ctx.response.status = 200
      ctx.response.message = 'OK'
    }
  })

app.use(KoaStatic(path.join(__dirname, '../upload')))
// koa-parameter 数据格式校验   使用方法和parameter一样，可在npm里面搜
app.use(parameter(app))

app.use(router.routes()).use(router.allowedMethods()) // 如果不加.use(router.allowedMethods()) 则用其他请求方式请求接口时会显示404，加上则显示501
// 统一错误处理
app.on('error', errHandler)

module.exports = app