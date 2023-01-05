/**
 *  商品sku表
 */
 const { DataTypes } = require('sequelize')
 const seq = require('../../db/seqConnection')
 
 const GoodsSku = seq.define('goods_sku', {
    sku_code: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'sku编码id',
    },
     goods_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         comment: '商品id',
     },
     inventory: {
         type: DataTypes.INTEGER,
         allowNull: false,
         comment: '库存',
     },
     old_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        comment: '商品原价',
    },
    price: {
         type: DataTypes.DECIMAL(10,2),
         allowNull: false,
         comment: '商品最新价',
     }
 },{
     // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
     // 不想要就设置为 false
     timestamps: true // 时间戳
 }
 ) 
 
 // 强制同步数据库(创建数据表)  
 // GoodsSku.sync({
 //     force: true //如果存在表，true 则新建
 // })
 
 
 module.exports = GoodsSku