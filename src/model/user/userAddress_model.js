/**
 *  用户地址表
 */
 const { DataTypes } = require('sequelize')
 const seq = require('../../db/seqConnection')
 
 const UserAddress = seq.define('user_address', {
     user_email: {
         type: DataTypes.STRING(20),
         allowNull: false,
         comment: '用户邮箱'
     },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '收货人姓名'
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '所在地区'
    },
    detailedly: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '详细地址'
    },
    postcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '邮编'
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: false,
        comment: '收货人电话'
    },
    default_addr: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '是否默认地址'
    }
 }, {
     // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
     // 不想要就设置为 false
     timestamps: true // 时间戳
 })
 
 // 强制同步数据库(创建数据表)  
 // UserAddress.sync({
 //     force: true //如果存在表，true 则新建
 // })
 
 
 module.exports = UserAddress