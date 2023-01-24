const User = require('../model/user/users_model')

class UserService {
    // 根据邮箱查找所有用户信息
    async findUser(email) {
        try {
            let result = await User.findOne({
                where: {
                    user_email: email
                }
            })
            return result
        } catch (error) {
            console.error(error)
        }
    }
    // 创建用户
    async createUser(email, user_name, password) {
        try {
            const result = await User.create({
                user_email: email,
                user_name: user_name,
                password: password,
                picture: 'https://i0.hdslb.com/bfs/face/d002e805cb5e06d4237756dc7b903ea99bd940ac.jpg@160w_160h_1c_1s.webp',
                email_activate: 0,
                vipGrade: 0,
                user_activate: 1
            })
            return result.dataValues
        } catch (error) {
            console.error(error)
        }
    }
    // 激活用户
    async updatedActivate(email) {
        try {
            const result = await User.update(
                {
                    email_activate: 1,
                },{
                    where: {
                        user_email: email
                    }
                })
            return result
        } catch (error) {
            console.error(error)
        }
    }
    // 删除用户
    async deleteUser(email) {
        console.log(email);
        try {
            const result = await User.destroy({
                where: {
                    user_email: email
                }
            })
            return result
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new UserService()