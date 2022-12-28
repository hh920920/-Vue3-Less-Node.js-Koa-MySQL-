// 1、导入sequelize的连接
const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const category_children_goods = seq.define('category_children_goods', {
    goods_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: '商品id',
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '商品名',
    },
    de_sc: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品详情',
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '价格',
    },
    children_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: '二级分类id',
    },
    category_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: '一级分类id',
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '图片链接',
    },
}, {
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: false // 时间戳
})

// 强制同步数据库(创建数据表)  
// HomeFreshGood.sync({
//     force: true //如果存在表，true 则新建
// })

module.exports = category_children_goods