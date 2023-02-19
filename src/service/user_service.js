const User = require('../model/user/users_model')
const Goods = require('../model/goods/goods__model')
const UserCollect = require('../model/user/userCollect_model')
const SysMessage = require('../model/user/SysMessage_model')
const Cart = require('../model/user/userCart_model')


UserCollect.hasMany(Goods, { foreignKey: 'goods_id', sourceKey: 'goods_id' })
Goods.belongsTo(UserCollect, { foreignKey: 'goods_id', targetKey: 'goods_id' })

class UserService {
    // 根据邮箱查找所有用户信息
    async findUser(email) {
        try {
            let result = await User.findOne({
                where: {
                    user_email: email
                }
            })
            return result
        } catch (error) {
            console.error(error)
        }
    }
    // 创建用户
    async createUser(email, user_name, password) {
        try {
            const result = await User.create({
                user_email: email,
                user_name: user_name,
                password: password,
                picture: 'https://img0.baidu.com/it/u=2009625090,3561415937&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
                email_activate: 0,
                vipGrade: 1,
                sex: '男',
                birthday: '2018-01-01',
                user_activate: 1
            })
            return result.dataValues
        } catch (error) {
            console.error(error)
        }
    }
    // 激活用户
    async updatedActivate(email) {
        try {
            const result = await User.update({
                email_activate: 1,
            }, {
                where: {
                    user_email: email
                }
            })
            return result
        } catch (error) {
            console.error(error)
        }
    }
    // 删除用户
    async deleteUser(email) {
        try {
            const result = await User.destroy({
                where: {
                    user_email: email
                }
            })
            return result
        } catch (error) {
            console.error(error)
        }
    }
    // 修改用户名
    async updateName(email, newName) {
        try {
            const result = await User.update({ user_name: newName }, {
                where: {
                    user_email: email
                }
            })

            return result
        } catch (error) {
            console.error(error)
        }
    }
    // 修改用户性别
    async updateSex(email, newValue) {
        try {
            const result = await User.update({ sex: newValue }, {
                where: {
                    user_email: email
                }
            })

            return result
        } catch (error) {
            console.error(error)
        }
    }
    // 修改用户生日
    async updateBirthday(email, newValue) {
        try {
            const result = await User.update({ birthday: newValue }, {
                where: {
                    user_email: email
                }
            })

            return result
        } catch (error) {
            console.error(error)
        }
    }

    // 修改用户密码
    async updatePassword(email, newValue) {
        try {
            const result = await User.update({ password: newValue }, {
                where: {
                    user_email: email
                }
            })

            return result
        } catch (error) {
            console.error(error)
        }
    }

    // 获取系统消息通知
    async getSysMessage() {
        try {
            const result = await SysMessage.findAll()

            return result
        } catch (error) {
            console.error(error)
        }
    }

    // 添加收藏商品
    async addUserCollect(email, goods_id) {
        try {
            // 1. 先查询此商品在不在收藏列表
            let resu = await UserCollect.findOne({
                where: {
                    goods_id: goods_id
                }
            })
            if (resu == null) {
                let result = await UserCollect.create({
                    user_email: email,
                    goods_id: goods_id
                })
                return result
            } else {
                return null
            }

        } catch (error) {
            console.error(error)
        }

    }

    // 获取所有用户收藏商品
    async findUserCollect(email) {

        try {
            let result = await UserCollect.findAll({
                attributes: ['goods_id'],
                include: [{
                    model: Goods
                }],
                where: {
                    user_email: email
                }
            })
            return result
        } catch (error) {
            console.error(error)
        }

    }

    // 添加购物车
    async addCart(email, goods_id, sku_id, goods_name, picture, price, count) {
        try {
            // 1.先通过skuId查询有没有记录，如果有记录，直接累加数量就行
            const res = await Cart.findOne({
                attributes: ['count'],
                where: {
                    sku_id: sku_id
                }
            })
            // 如果没有，则添加
            if (res == null || res == '') {
                const result = await Cart.create({
                    user_email: email,
                    goods_id: goods_id,
                    sku_id: sku_id,
                    goods_name: goods_name,
                    picture: picture,
                    price: price,
                    count: count
                })

                return result

            } else {
                const resu = await Cart.update({ count: (res.dataValues.count + count) }, {
                    where: {
                        sku_id: sku_id
                    }
                })
                return resu
            }

        } catch (error) {
            console.error(error)
        }
    }

    // 获取购物车列表
    async getCartList(email) {
        try {
            // 1.先通过skuId查询有没有记录，如果有记录，直接累加数量就行
            const result = await Cart.findAll({
                where: {
                    user_email: email
                }
            })

            return result

        } catch (error) {
            console.error(error)
        }
    }

}

module.exports = new UserService()