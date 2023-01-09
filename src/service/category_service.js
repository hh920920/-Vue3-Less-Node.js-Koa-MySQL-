const Category = require('../model/category/category_model')
const CategoryChildren = require('../model/category/categoryChildren_model')
const CategoryChildrenGoods = require('../model/goods/goods__model')
const CategorySpecs = require('../model/category/category_specs')
const CategorySpecsValue = require('../model/category/category_specs_value')
const HomeBrands = require('../model/home/homeBrand_model')

Category.hasMany(CategoryChildren, { foreignKey: 'category_id', sourceKey: 'category_id', as: 'children' })
CategoryChildren.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'category_id' })

Category.hasMany(CategoryChildrenGoods, { foreignKey: 'category_id', sourceKey: 'category_id', as: 'goods' })
CategoryChildrenGoods.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'category_id' })

CategoryChildren.hasMany(CategoryChildrenGoods, { foreignKey: 'children_id', sourceKey: 'children_id', as: 'chirldren_goods' })
CategoryChildrenGoods.belongsTo(CategoryChildren, { foreignKey: 'children_id', targetKey: 'children_id' })


CategoryChildren.hasMany(CategorySpecs, { foreignKey: 'children_id', sourceKey: 'children_id', as: 'saleProperties' })
CategorySpecs.belongsTo(CategoryChildren, { foreignKey: 'children_id', targetKey: 'children_id' })

CategoryChildren.hasMany(HomeBrands, { foreignKey: 'brand_id', sourceKey: 'children_id', as: 'brands' })
HomeBrands.belongsTo(CategoryChildren, { foreignKey: 'brand_id', targetKey: 'children_id' })

CategorySpecs.hasMany(CategorySpecsValue, { foreignKey: 'specs_id', sourceKey: 'specs_id', as: 'properties' })
CategorySpecsValue.belongsTo(CategorySpecs, { foreignKey: 'specs_id', targetKey: 'specs_id' })

class CategoryService {
    // 获取全部分类信息
    async getCategory() {
        try {
            const result = await Category.findAll({
                include: [{
                        model: CategoryChildren,
                        attributes: ['children_id', 'name', 'picture'],
                        as: 'children'
                    },
                    {
                        model: CategoryChildrenGoods,
                        attributes: ['goods_id', 'name', 'de_sc', 'price', 'picture'],
                        as: 'goods'
                    }
                ]
            })

            return result

        } catch (error) {
            console.error(error)
        }
    }
    // 根据id获取二级分类
    async getTopCategory(id) {
        try {
            const res = await Category.findAll({
                attributes: ['category_id', 'name'],
                include: [{
                    model: CategoryChildren,
                    attributes: ['children_id', 'name', 'de_sc'],
                    as: 'children',
                    include: [{
                        model: CategoryChildrenGoods,
                        // attributes: ['goods_id', 'name', 'de_sc', 'price', 'picture'],
                        as: 'chirldren_goods'
                    }]
                }],
                where: {
                    category_id: id
                }
            })

            return await res

        } catch (error) {
            console.error(error)
        }
    }

    // 通过id获取二级类目下的分类规格信息
    async getCategorySpecs(id) {
        try {
            const result = await CategoryChildren.findAll({
                attributes: ['children_id', 'name', 'category_id', 'cateType'],
                include: [{
                        model: HomeBrands,
                        as: 'brands'
                    },
                    {
                        model: CategorySpecs,
                        attributes: ['specs_id', 'specs_name'],
                        as: 'saleProperties',
                        include: [{
                            model: CategorySpecsValue,
                            attributes: ['specs_children_id', 'name'],
                            as: 'properties'
                        }]
                    }
                ],
                where: {
                    children_id: id
                }
            })

            return result

        } catch (error) {
            console.error(error)
        }
    }

    // 通过id获取二级类目下的分类商品
    async getCategoryGoods(id, offset, pageSize) {
        try {
            const { count, rows } = await CategoryChildrenGoods.findAndCountAll({
                // attributes: ['id', 'goods_id', 'name', 'de_sc', 'oldPrice', 'price', 'picture', 'salesCount' ,'goods_status'],
                where: {
                  children_id: id
                },
                offset: offset,
                limit: pageSize
              })

            return { count, rows }

        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new CategoryService()