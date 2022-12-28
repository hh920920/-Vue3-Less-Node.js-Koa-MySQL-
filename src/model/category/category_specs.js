const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const Category_specs = seq.define('category_specs', {
    children_id: {
        type: DataTypes.INTEGER,
        comments: '二级分类id'
    },
    specs_name: {
        type: DataTypes.STRING,
        comment: '规格名称'
    },
    specs_id: {
        type: DataTypes.STRING,
        comments: '规格id'
    }
}, {
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: true // 时间戳
})


// 强制同步数据库(创建数据表)  
// Category_specs.sync({
//     force: true //如果存在表，true 则新建
// })

module.exports = Category_specs