const Details = require('../../model/goods/goodsDetails_model')
const DetailsPictures = require('../../model/goods/detailsPicture_model')

class GoodsDetails {
    // 获取商品详情信息
    async getGoodsDetails (id) {
        try {
            const result = await Details.findAll({
                attributes: ['name', 'value'],
                where: {
                    goods_id: id
                }
            })
            const res = await DetailsPictures.findAll({
                attributes: ['picture'],
                where: {
                    goods_id: id
                }
            })
            return { result, res }
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new GoodsDetails()