// controller（控制器）文件存放处理业务逻辑

const {
    getHomeBrand,
    getHomeBanner,
    getHomeFreshGoods,
    getHomeHot,
    getHomeSpecial
} = require('../service/home_service')

class HomeController {
    // 首页品牌
    async brand(ctx, next) {
        // 1.获取数据条数个数
        const limit = parseInt(ctx.request.query.limit)
        // 2. 操作数据库
        const res = await getHomeBrand(limit)
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: 'success',
            result: res,
        }
    }

    // 首页轮播图
    async banner(ctx, next) {
        // 1. 操作数据库
        const res = await getHomeBanner()
        // 2. 返回结果
        ctx.body = {
            code: 0,
            message: 'success',
            result: res,
        }
    }

    // 首页新鲜好物
    async freshGood(ctx, next) {
        // 获取数据条数个数，默认为4
        const { limit } = ctx.request.query
        let num = (limit !== undefined) ? limit : 4
        // 返回结果
        if (!isNaN(num)) {
            const res = await getHomeFreshGoods(parseInt(num))
            ctx.body = {
                code: 0,
                message: 'success',
                result: res,
            }
        } else {
            ctx.body = {
                code: 1,
                message: '参数错误',
                result: ''
            }
        }
    }
    // 首页人气推荐
    async hot(ctx, next) {
        const res = await getHomeHot()
        ctx.body = {
            code: 0,
            message: 'success',
            result: res,
        }
    }

    // 首页最新专题
    async special(ctx, next) {
        // 获取数据条数个数，默认为3
        const { limit } = ctx.request.query
        let num = (limit !== undefined) ? limit : 3
        // 返回结果
        if (!isNaN(num)) {
            const res = await getHomeSpecial(parseInt(num))
            ctx.body = {
                code: 0,
                message: 'success',
                result: res,
            }
        } else {
            ctx.body = {
                code: 1,
                message: '参数错误',
                result: ''
            }
        }
    }

}

// 类不能直接导出，所以转化为导出实例化对象
module.exports = new HomeController()