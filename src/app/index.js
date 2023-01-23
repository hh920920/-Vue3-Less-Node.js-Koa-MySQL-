const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')

const ejs = require('ejs')
const views = require('koa-views')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')
const cors = require('koa2-cors'); // 解决跨域插件

const errHandler = require('./errHandler')
// 导入路由
const router = require('../router')

const app = new Koa()
// KoaBody 支持文件上传
app.use(
    KoaBody({
        multipart: true,
        // formidable: {
        //     // 在配置选项option里，不推荐使用相对路径  不能'../upload'
        //     // 因为它不是相对当前文件，而是相对process.cwd()
        //     // 用绝对路径比较好点
        //     uploadDir: path.join(__dirname, '../src/upload'),
        //     keepExtensions: true,
        //     uploadDir: path.join(__dirname, '../upload'),
        //     keepExtensions: true,
        // },
        parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
    })
)


// app.use(KoaStatic(path.join(__dirname, '../upload')))
// koa-parameter 数据格式校验   使用方法和parameter一样，可在npm里面搜
app.use(parameter(app))
app.use(cors({
    // 任何地址都可以访问
    // origin: "*",
    // 指定地址才可以访问
    // origin: 'http://localhost:8080',

     //设置允许来自指定域名请求
    origin: function(ctx) {
        return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 60, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))

//应用ejs 模板引擎
app.use(views('static',{
    extension:'ejs'
}))
app.use(KoaStatic(__dirname + '/static'))

app.use(router.routes()).use(router.allowedMethods()) // 如果不加.use(router.allowedMethods()) 则用其他请求方式请求接口时会显示404，加上则显示501
// 统一错误处理
app.on('error', errHandler)

module.exports = app