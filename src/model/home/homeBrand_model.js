// 1、导入sequelize的连接
const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const HomeBrand = seq.define('home_brand', {
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '品牌id',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '中文名',
    },
    nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '英文名',
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '品牌LOGO',
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '品牌图片',
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '品牌类型',
    },
    de_sc: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '品牌描述',
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '品牌产地',
    }
},{
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: false // 时间戳
}
) 

// 强制同步数据库(创建数据表)  
// HomeBrand.sync({
//     force: true //如果存在表，true 则新建
// })


module.exports = HomeBrand