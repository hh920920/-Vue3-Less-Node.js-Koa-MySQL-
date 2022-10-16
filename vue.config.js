const {
    defineConfig
} = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            // 哪些文件自动引入，使用绝对路径，使用path.join来拼接
            patterns: [
                path.join(__dirname, './src/assets/styles/variables.less'),
                path.join(__dirname, './src/assets/styles/mixins.less')
            ]
        }
    },
    // 配置10kb下的图片打包成base64的格式 
    // chainWebpack: config => {
    //     config.module
    //         .rule('images')
    //         .use('url-loader')
    //         .loader('url-loader')
    //         .tap(options => Object.assign(options, { limit: 10000 }))
    // }
})