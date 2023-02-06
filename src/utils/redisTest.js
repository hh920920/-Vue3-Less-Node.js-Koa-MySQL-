const {
    setString,
    getString
} = require('./redis-client')

const tokenValue = '123456'

const time = Date.parse("2022/1/26 21:18")
console.log(isNaN(time)) 
// const res = setString(tokenValue, '88888888@qq.com' + '_access_token',time )
// console.log(res);
getString(tokenValue).then(data => {
    console.log('user: ' + data);
})