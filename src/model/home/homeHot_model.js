/**
 *  首页人气表
 */
const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const HomeHot = seq.define('home_hot', {
    hot_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: '人气推荐id'
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '人气推荐图片'
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '人气推荐标题'
    },
    alt: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '人气推荐别名'
    },
    
}, {
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: false // 时间戳
})
 
// 强制同步数据库(创建数据表)  
// HomeHot.sync({
//     force: true    //如果存在表，true 则新建
// })


module.exports = HomeHot