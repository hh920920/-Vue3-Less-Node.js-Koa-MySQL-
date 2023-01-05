/**
 *  首页轮播图表
 */
const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const HomeBanner = seq.define('home_banner', {
    banner_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: '轮播图id',
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '轮播图地址',
    },
    hrefUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '轮播图跳转链接',
    },
    type: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
        comment: '轮播图跳转类型(1页面、2H5、3小程序)',
    }
},{
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: false // 时间戳
}
) 

// 强制同步数据库(创建数据表)  
// HomeBanner.sync({
//     force: true //如果存在表，true 则新建
// })


module.exports = HomeBanner