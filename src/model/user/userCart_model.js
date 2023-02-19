/**
 *  购物车表
 */
const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const UserCart = seq.define('user_cart', {
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户邮箱',
    },
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id',
    },
    sku_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: 'skuId',
    },
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名字',
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片',
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        comment: '价格',
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '数量',
    }
}, {
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: true // 时间戳
})

// 强制同步数据库(创建数据表)  
// UserCart.sync({
//     force: true //如果存在表，true 则新建
// })


module.exports = UserCart