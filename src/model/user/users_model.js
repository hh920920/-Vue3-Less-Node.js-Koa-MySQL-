/**
 *  用户表
 */
 const { DataTypes } = require('sequelize')
 const seq = require('../../db/seqConnection')
 
 const Users = seq.define('users', {
     user_email: {
         type: DataTypes.STRING(30),
         allowNull: false,
         comment: '用户邮箱'
     },
    user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '用户名'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户密码'
    },
    picture: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '用户头像'
    },
    email_activate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '邮箱账号激活状态'
    },
    vipGrade: {
        type: DataTypes.TINYINT(2),
        allowNull: false,
        comment: 'Vip等级'
    },
    user_activate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '账号状态，正常或冻结'
    }
 }, {
     // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
     // 不想要就设置为 false
     timestamps: true // 时间戳
 })
 
 // 强制同步数据库(创建数据表)  
//  Users.sync({
//      force: true //如果存在表，true 则新建
//  })
 
 
 module.exports = Users