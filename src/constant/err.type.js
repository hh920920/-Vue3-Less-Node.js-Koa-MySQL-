module.exports = {
    parameterError: {
        code: '10001',
        message: '参数错误',
        result: ''
    },
    parameterFormatError: {
        code: '10002',
        message: '参数格式错误',
        result: ''
    },
    userExist: {
        code: '10003',
        message: '该用户已注册，请前往登录',
        result: ''
    },
    userExistNotActivate: {
        code: '10004',
        message: '用户未激活，请前往邮箱激活',
        result: ''
    },
    userDoesNotExist: {
        code: '10004',
        message: '用户不存在',
        result: ''
    },
    emailFormatError: {
        code: '10005',
        message: '邮箱格式错误',
        result: ''
    },
    userRegisterError: {
        code: '10006',
        message: '已过验证有效期，请重新提交注册',
        result: ''
    },
    isNoGoodsError: {
        code: '10003',
        message: '未查询到商品信息',
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: '用户登录失败',
        result: ''
    },
    invalidPassword: {
        code: '10006',
        message: '密码错误',
        result: ''
    },
    updatePassordError: {
        code: '10007',
        message: '密码修改失败',
        result: ''
    },
    TokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result: ''
    },
    invalidToken: {
        code: '10102',
        message: '无效的token',
        result: ''
    },
    hasNotAdminPermission: {
        code: '10103',
        message: '没有管理员权限',
        result: ''
    },
    fileUploadERrror: {
        code: '10201',
        message: '商品图片上传失败',
        result: '',
    },
    unSupportedFileType: {
        code: '10202',
        message: '不支持的文件格式',
        result: '',
    },
    publishGoodsError: {
        code: '10204',
        message: '发布商品失败',
        result: '',
    },
    invalidGoodsID: {
        code: '10205',
        message: '商品ID不存在 ',
        result: '',
    },
    cartFormatError: {
        code: '10301',
        message: '购物车数据格式错误',
        result: '',
    },
    addressFormatError: {
        code: '10302',
        message: '地址数据格式错误',
        result: '',
    },
    orderFormatError: {
        code: '10303',
        message: '订单数据格式错误',
        result: '',
    },
}