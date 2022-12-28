// 总入口

const {
    APP_PORT
} = require('./config/config_default')



const app = require('./app')

app.listen(APP_PORT, () => {
    console.log(`server is  start...   127.0.0.1:${APP_PORT}`)
})