const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const Category_specs_value = seq.define('category_specs_value', {
    specs_id: {
        type: DataTypes.STRING,
        comments: '规格id'
    },    
    specs_children_id: {
        type: DataTypes.STRING,
        comments: '规格子类id'
    },
    name: {
        type: DataTypes.STRING,
        comment: '规格子类名称'
    }
}, {
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: false // 时间戳
})


// 强制同步数据库(创建数据表)  
// Category_specs_value.sync({
//     force: true //如果存在表，true 则新建
// })

module.exports = Category_specs_value