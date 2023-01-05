const Goods = require('../../model/goods/goods__model')
const GoodsPictrues = require('../../model/goods/goodsPictures_model')
const GoodsSpecs = require('../../model/goods/goodsSpecs_model')
const GoodsSpecsValue = require('../../model/goods/goodsSpecsValue_model')
const GoodsSku = require('../../model/goods/goodsSku_model')
const SkuSpecs = require('../../model/goods/skuSpecs_model')
const Category = require('../../model/category/category_model')
const CategoryChildren = require('../../model/category/categoryChildren_model')
const GoodsRecommend = require('../../model/goods/goodsRecommend_model')

Goods.hasMany(GoodsPictrues, { foreignKey: 'goods_id', sourceKey: 'goods_id', as: 'mainPictures' })
GoodsPictrues.belongsTo(Goods, { foreignKey: 'goods_id', targetKey: 'goods_id' })

Goods.hasMany(GoodsSku, { foreignKey: 'goods_id', sourceKey: 'goods_id', as: 'skus' })
GoodsSku.belongsTo(Goods, { foreignKey: 'goods_id', targetKey: 'goods_id' })

GoodsSku.hasMany(SkuSpecs, { foreignKey: 'sku_code', sourceKey: 'sku_code', as: 'specs' })
SkuSpecs.belongsTo(GoodsSku, { foreignKey: 'sku_code', targetKey: 'sku_code' })

Goods.hasMany(CategoryChildren, { foreignKey: 'children_id', sourceKey: 'children_id', as: 'categories' })
CategoryChildren.belongsTo(Goods, { foreignKey: 'children_id', targetKey: 'children_id' })

CategoryChildren.hasMany(Category, { foreignKey: 'category_id', sourceKey: 'category_id', as: 'parents' })
Category.belongsTo(CategoryChildren, { foreignKey: 'category_id', targetKey: 'category_id' })

Goods.hasMany(GoodsSpecs, { foreignKey: 'goods_id', sourceKey: 'goods_id', as: 'specs' })
GoodsPictrues.belongsTo(GoodsSpecs, { foreignKey: 'goods_id', targetKey: 'goods_id' })

GoodsSpecs.hasMany(GoodsSpecsValue, { foreignKey: 'specs_id', sourceKey: 'specs_id', as: 'values' })
GoodsSpecsValue.belongsTo(GoodsSpecs, { foreignKey: 'specs_id', targetKey: 'specs_id' })


GoodsRecommend.hasMany(Goods, { foreignKey: 'goods_id', sourceKey: 'goods_id' })
Goods.belongsTo(GoodsRecommend, { foreignKey: 'goods_id', targetKey: 'goods_id' })

class GoodsInfo {
    // 通过商品id获取商品信息
    async getGoodsInfo(id) {
        try {
            const result = await Goods.findAll({
                attributes: ['goods_id', 'name', 'de_sc', 'oldPrice', 'price', 'picture', 'salesCount', 'goods_status', 'children_id'],
                include: [{
                        model: GoodsPictrues,
                        attributes: ['picture'],
                        as: 'mainPictures'
                    },
                    {
                        model: CategoryChildren,
                        attributes: ['children_id', 'name', 'layer'],
                        as: 'categories',
                        include: [{
                            model: Category,
                            attributes: ['category_id', 'name', 'layer'],
                            as: 'parents'
                        }]
                    },
                    {
                        model: GoodsSpecs,
                        attributes: ['specs_id', 'name'],
                        as: 'specs',
                        include: [{
                            model: GoodsSpecsValue,
                            attributes: ['name', 'de_sc', 'picture'],
                            as: 'values'
                        }]
                    },
                    {
                        model: GoodsSku,
                        attributes: ['sku_code', 'inventory', 'old_price', 'price'],
                        as: 'skus',
                        include: [{
                            model: SkuSpecs,
                            attributes: ['name', 'valueName'],
                            as: 'specs',
                        }]
                    }
                ],
                where: {
                    goods_id: id
                }
            })
            return result
        } catch (error) {
            console.error(error)
        }
    }
    // 商品按条件排序
    async goodsSort(id, condition, sort ) {
        try {
            const resullt = await Goods.findAll({
                order: [
                    [condition, sort],
                ],
                where: {
                    children_id: id,
                }
            })
            
            return resullt 

        } catch (error) {
            console.error(error)
        }
    }
    // 获取推荐商品 
    async getGoodsRecommend () {
        try {
            let result = await GoodsRecommend.findAll({
                attributes:['goods_id'],
                include: [{
                    model: Goods
                }]
            })     
            return result
        } catch (error) {
           console.error(error) 
        }
    }
}

module.exports = new GoodsInfo()