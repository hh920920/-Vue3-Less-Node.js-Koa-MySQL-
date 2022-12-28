// 用户模块
export default {
    namespaced: true,
    state() {
        return {
            // 用户信息
            profile: {
                id: '',
                account: '',
                avatar: '',
                nickname: '',
                mobile: ''
            },
            // 登录后回跳路径
            redirectUrl: '/',
            // 存储token
            Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
        }
    },
    getters: { // 监听数据变化的
        getToken(state) { // 获取本地存储的登录信息
            return state.profile.token
        }
    },
    mutations: {
        // 修改用户信息，payload就是用户信息对象
        setUser(state, payload) {
            state.profile = payload
        },
        // 修改回跳地址
        setRedirectUrl(state, url) {
            state.redirectUrl = url
        },
        // 修改token，并将token存入localStorage
        changeLogin(state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        }
    },
    actions: {

    }
}