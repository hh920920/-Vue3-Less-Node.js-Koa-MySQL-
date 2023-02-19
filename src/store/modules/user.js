// 用户模块
export default {
    namespaced: true,
    state() {
        return {
            // 用户信息
            profile: {
                user_id: 1,
                user_email: '',
                user_name: '',
                vipGrade: 0,
                picture: '',
                sex: '',
                birthday: '',
                access_token: '',
                refresh_token: ''
            },
            // 登录后回跳路径
            redirectUrl: '/',
            // 存储token
            // Authorization: localStorage.getItem('xxm-refresh_t') ? localStorage.getItem('Authorization') : ''
        }
    },
    getters: { // 监听数据变化的
        getUserInfo(state) { // 获取本地存储的登录信息
            return state.profile
        }
    },
    mutations: {
        // 修改用户信息，payload就是用户信息对象
        setUser(state, payload) {
            // state.profile = payload
            state.profile.user_id = payload.user_id
            state.profile.user_email = payload.user_email
            state.profile.user_name = payload.user_name
            state.profile.vipGrade = payload.vipGrade
            state.profile.picture = payload.picture
            state.profile.sex = payload.sex
            state.profile.birthday = payload.birthday
            // console.log(payload.user_email);
        },
        // 修改回跳地址
        setRedirectUrl(state, url) {
            state.redirectUrl = url
        },
        // 修改用户名
        updateName (state, newValue) {
            state.profile.user_name = newValue
        },
        // 修改用户性别
        updateSex (state, newValue) {
            state.profile.sex = newValue
        },
        // 修改用户生日
        updateBirthday (state, newValue) {
            state.profile.birthday = newValue
        }
    },
    actions: {

    }
}