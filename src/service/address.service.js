const Address = require('../model/user/userAddress_model')

class AddressService {
    // 添加收货地址
    async createAddres(email, name, region, detailedly, postcode, phone) {
        // console.log(region);
        try {
            const result =  await Address.create({
                user_email: email, 
                name: name,
                region: region,
                detailedly: detailedly,
                postcode: postcode,
                phone: phone,
                default_addr: 0
            })
            return result
        } catch (error) {
            console.error(error)
        }
        return result
    }
    // 获取用户收货地址
    async findAll(email) {
        return await Address.findAll({
            attributes: ['id', 'name', 'region', 'detailedly', 'postcode', 'phone', 'default_addr', 'createdAt', 'updatedAt'],
            where: {
                user_email: email
            }
        })
    }
    async updateAddress(id, addr) {
        return await Address.update(addr, {
            where: {
                id
            }
        })
    }
    // 删除收货地址
    async removeAddress(id) {
        return await Address.destroy({
            where: {
                id
            }
        })
    }
    async setAddr(email, id) {
        // 先把全部设置默认为0
        await Address.update({
            default_addr: 0
        }, {
            where: {
                user_email: email,
            }
        })
        // 再根据传进来的id设置为1
        return await Address.update({
            default_addr: 1
        }, {
            where: {
                id,
            }
        })
    }
}

module.exports = new AddressService()