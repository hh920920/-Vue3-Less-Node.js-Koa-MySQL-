module.exports = {
    refreshTokenError: {
        code: '10000',
        message: '请重新刷新token'
    },
    parameterError: {
        code: '10001',
        message: '参数错误'
    },
    parameterFormatError: {
        code: '10002',
        message: '参数格式错误'
    },
    userExist: {
        code: '10003',
        message: '该用户已注册，请前往登录'
    },
    userExistNotActivate: {
        code: '10004',
        message: '用户未激活，请前往邮箱激活'
    },
    userDoesNotExist: {
        code: '10004',
        message: '用户不存在',
        data: ''
    },
    emailFormatError: {
        code: '10005',
        message: '邮箱格式错误'
    },
    userRegisterError: {
        code: '10006',
        message: '已过验证有效期，请重新提交注册'
    },
    invalidPassword: {
        code: '10007',
        message: '密码错误'
    },
    invalidUser: {
        code: '10008',
        message: '账号已被冻结，请联系客服',
        data: ''
    },
    tokenExpiredError: {
        code: '10009',
        message: 'token已过期'
    },
    invalidToken: {
        code: '10010',
        message: '无效的token'
    },
    updateError: {
        code: '10011',
        message: '修改失败'
    },
    addressFormatError: {
        code: '10012',
        message: '地址数据格式错误'
    },
    addCollectError: {
        code: '10013',
        message: '此商品已在收藏列表中'
    },
    addCartError: {
        code: '10014',
        message: '加入购物车失败'
    },
}