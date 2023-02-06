// 定义校验规则提供给vee-validate组件使用
export default {
    // 校验邮箱
    email(value) {
        if (!value) return '请输入邮箱帐号'
        const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{3,4})$/
        if (!regEmail.test(value)) {
            return '邮箱格式错误'
        }
        return true
    },
    // 校验account
    user_name(value) {
        // value是将来使用该规则的表单元素的值
        // 1. 必填
        // 2. 6-20个字符，需要以字母开头
        // 如何反馈校验成功还是失败，返回true才是成功，其他情况失败，返回失败原因。
        if (!value) return '请输入用户名'
        if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
        return true
    },
    // 校验密码
    password(value) {
        if (!value) return '请输入密码'
        if (!/^\w{6,24}$/.test(value)) {
            return '密码是6-24个字符'
        }
        return true
    },
    // 校验确认密码
    confirmPw(confirmPw, password) {
        const pw = password.form.password
        if (!confirmPw) return '请输入确认密码'
        if (!/^\w{6,24}$/.test(confirmPw)) {
            return '密码是6-24个字符'
        }
        if (confirmPw !== pw) {
            return '两次密码不一致'
        }
        return true
    }
}