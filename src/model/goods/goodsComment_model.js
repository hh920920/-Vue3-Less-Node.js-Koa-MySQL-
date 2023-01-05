/**
 *  商品评论表
 */
const { DataTypes } = require('sequelize')
const seq = require('../../db/seqConnection')

const GoodsComment = seq.define('goods_comment', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id',
    },
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id',
    },
    content: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '评论内容',
    },
    LikeCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '点赞数量'
    },
    officialReply: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '回复内容'
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '评星'
    },
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '相关订单编号'
    }
}, {
    // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
    // 不想要就设置为 false
    timestamps: true // 时间戳
})

// 强制同步数据库(创建数据表)  
// GoodsComment.sync({
//     force: true //如果存在表，true 则新建
// })


module.exports = GoodsComment