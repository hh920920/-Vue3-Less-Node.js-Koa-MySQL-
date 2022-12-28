const {
    MYSQL_HOST, // 数据库地址
    MYSQL_PORT, // 端口
    MYSQL_DB_NAME, // 数据库名
    MYSQL_USER, // 用户名
    MYSQL_PASSWORD // 密码
} = require('../config/config_default')

const {
    Sequelize
} = require("sequelize")

const sequelize = new Sequelize(MYSQL_DB_NAME, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
});


// sequelize.authenticate()
//     .then(() => {
//         console.log('数据库连接成功')
//     })
//     .catch(err => {
//         console.log('数据库连接失败', err)
//     })

module.exports = sequelize