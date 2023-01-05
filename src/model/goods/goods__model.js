/**
 *  商品表
 */
const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const Goods = seq.define('goods', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名字',
    },
    de_sc: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '描述',
    },
    oldPrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        comment: '原价格',
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        comment: '最新价格',
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片',
    },
    salesCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '销量',
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '一级分类id'
    },
    children_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '所属二级分类id'
    },
    goods_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品状态：1上架，0下架'
    }
},{
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: true // 时间戳
}
) 

// 强制同步数据库(创建数据表)  
// Goods.sync({
//     force: true //如果存在表，true 则新建
// })


module.exports = Goods