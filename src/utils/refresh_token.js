import axios from 'axios'
import store from '@/store'

// isRefreshToken 是判断是否开启进入刷新token程序的开关
let isRefreshToken = 0
const refreshUrl = 'http://127.0.0.1:3000/user/refreshToken'

// 等待函数
function awaitTimeToken() {
    return new Promise(resolve => {
        // 仅仅就是为了吊起，就是等待足够长时间
        const timers = setInterval(() => {
            clearInterval(timers)
            resolve('success~')
        }, 5000) // 轮询时间间隔
    })
}


// 刷新token函数
function refreshToken() {
    let rsToken = localStorage.getItem('xxm-pc-refresh_t')
    let lock = false
    let success = false
    // axios.defaults.baseURL = 'http://192.168.2.119:3000/user'
    if (!lock) {
        lock = true
        console.log('进入刷新程序1')
        axios({
                method: 'post',
                url: refreshUrl,
                headers: {
                    Authorization: `Bearer ${rsToken}`
                }
            })
            .then(res => {
                console.log('refresh_token success !')
                // access_token = res.data.access_token
                localStorage.setItem('xxm-pc-access_t', res.data.data.access_token)
                localStorage.setItem('xxm-pc-refresh_t', res.data.data.refresh_token)
                store.commit('user/setUser', res.data.data)
                success = true
                lock = false
            })
            .catch(err => {
                success = false
                lock = false
                console.log('验证过期，请重新登录')
                // 跳转登录页
                store.commit('user/setUser', {})
                localStorage.clear()
                setTimeout(() => {
                    location.replace('/user/login')
                }, 1000)
            })
    }
    return new Promise(resolve => {
        // 一直看lock,直到请求失败或者成功
        const timer = setInterval(() => {
            if (!lock) {
                clearInterval(timer)
                if (success) {
                    resolve('refreshToken success')
                } else {
                    resolve('refreshToken fail')
                }
            }
        }, 1000) // 轮询时间间隔
    })
}


export default (error, instance) => {
    if (error.response.config.headers.Authorization.length > 20) {
        isRefreshToken++
        if (isRefreshToken === 1) {
            console.log('有token,但是过期了1，要开始刷新token了1。')
            const getTokenRes = refreshToken()
            if (getTokenRes === 'success') {
                response.config.headers.Authorization = 'Bearer ' + access_token
                // console.log('重启错误请求1', response.config)
                // return instance(response.config)
            }
            isRefreshToken = 0
        } else {
            console.log('有token,但是过期了2,等待新的token中2')
            const awaitTime = awaitTimeToken()
            if (awaitTime === 'success') {
                response.config.headers.Authorization = 'Bearer ' + access_token
                // console.log('重启剩余错误请求2', response.config)
                // return instance(response.config)
            }
        }
    } else {
        console.log('没有token')
        return error.response
    }
}