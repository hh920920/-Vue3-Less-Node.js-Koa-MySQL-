// 1、导入sequelize的连接
const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const Category = seq.define('categories', {
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '一级分类id',
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '一级分类名字',
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '图标',
    },
    saleInfo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '出售信息',
    }

},{
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: false // 时间戳
}
) 

// 强制同步数据库(创建数据表)  
// Home_category.sync({
//     force: true //如果存在表，true 则新建
// })


module.exports = Category