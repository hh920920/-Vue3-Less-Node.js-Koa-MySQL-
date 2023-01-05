/**
 *  首页专题表
 */
const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const HomeSpecial = seq.define('home_special', {
    special_id: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '专题id',
    },
    creator: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '',
    },
    isDelete: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        comment: '是否删除(1是,0不是)',
    },
    classificationId: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        comment: '分类Id',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '标题',
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '看法/摘要总结/评价',
    },
    lowestPrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        comment: '最低价格',
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '封面地址',
    },
    detailsUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '详情地址',
    },
    collectNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '点赞数量',
    },
    viewNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '浏览量',
    },
    replyNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '评论数量',
    }
}, {
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: true // 时间戳
})


// 强制同步数据库(创建数据表)  
// HomeSpecial.sync({
//     force: true //如果存在表，true 则新建
// })

module.exports = HomeSpecial