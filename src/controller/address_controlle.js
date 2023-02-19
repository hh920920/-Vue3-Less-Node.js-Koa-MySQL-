const {
    createAddres,
    findAll,
    updateAddress,
    removeAddress,
    setAddr,
} = require('../service/address.service')

const jwt_decode = require('jwt-decode')

class AddressController {
    // 添加收货地址
    async create(ctx, next) {
        let {
            name,
            region,
            detailedly,
            postcode,
            phone
        } = ctx.request.body

        // 解析信息
        const {
            authorization = ''
        } = ctx.request.header
        const token = authorization.replace('Bearer ', '')
        const user = jwt_decode(token)
        const email = user.user_email

        const res = await createAddres(email, name, region, detailedly, postcode, phone)

        if (res) {
            ctx.body = {
                code: 0,
                message: '地址添加成功',
            }
        } else {
            ctx.body = {
                code: -1,
                message: '地址添加失败',
            }
        }

    }
    // 获取收货地址
    async getAddress(ctx, next) {
        // 解析信息
        const {
            authorization = ''
        } = ctx.request.header
        const token = authorization.replace('Bearer ', '')
        const user = jwt_decode(token)
        const email = user.user_email

        const res = await findAll(email)
        if (res) {
            ctx.body = {
                code: 0,
                message: 'success',
                result: res
            }
        }
    }
    // 修改收货地址
    async update(ctx, next) {
        let id = ctx.request.params.id
        const res = await updateAddress(id, ctx.request.body)
        ctx.body = {
            code: 0,
            message: '地址修改成功',
            result: res
        }
    }
    // 删除收货地址
    async remove(ctx, next) {
        let id = ctx.request.params.id
        const res = await removeAddress(id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '删除地址成功'
            }
        } else {
            ctx.body = {
                code: -1,
                message: '删除地址失败'
            }
        }
    }
    // 设置默认收货地址
    async setDefault(ctx, next) {
        const id = ctx.request.params.id
        // 解析信息
        const {
            authorization = ''
        } = ctx.request.header
        const token = authorization.replace('Bearer ', '')
        const user = jwt_decode(token)
        const email = user.user_email

        const res = await setAddr(email, id)
        ctx.body = {
            code: 0,
            message: '地址设置默认成功',
            result: res
        }
    }
}

module.exports = new AddressController()