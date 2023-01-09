const Details = require('../../model/goods/goodsDetails_model')
const DetailsPictures = require('../../model/goods/detailsPicture_model')

class GoodsDetails {
    // 获取商品详情信息
    async getGoodsDetails(id) {
        try {
            // 1.先根据商品id查询商品存不存在
            const isGoods = await Details.findOne({
                where: {
                    goods_id: id
                }
            })
            // 如果不存在，则返回false
            if (!isGoods) {
                return {isGoods}
            }
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