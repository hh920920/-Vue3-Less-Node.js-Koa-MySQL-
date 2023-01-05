/**
 *  商品规格名称表
 */
 const { DataTypes } = require('sequelize')
 const seq = require('../../db/seqConnection')
 
 const SkuSpecs = seq.define('goods_sku_specs', {
    sku_code: {
         type: DataTypes.INTEGER,
         allowNull: false,
         comment: 'sku编码id'
     },
     name: {
         type: DataTypes.STRING,
         allowNull: false,
         comment: 'sku规格名称'
     },
     valueName: {
        type: DataTypes.STRING,
         allowNull: false,
         comment: 'sku规格值'
     }
 },{
     // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
     // 不想要就设置为 false
     timestamps: true // 时间戳
 }
 ) 
 
 // 强制同步数据库(创建数据表)  
 // SkuSpecs.sync({
 //     force: true //如果存在表，true 则新建
 // })
 
 
 module.exports = SkuSpecs