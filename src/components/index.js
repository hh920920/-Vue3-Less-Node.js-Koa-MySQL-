// 注册全局插件
// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
// 使用3G网络测试看效果

/*  批量注册组件  */
// 使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
// 然后 context 函数会返回一个导入函数 importFn
// 它又一个属性 keys() 获取所有的文件路径
// 通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
// 遍历的同时进行全局注册即可

// 导入当前文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
// console.log(importFn.keys())

import Message from './Message'

export default {
    install(app) {
        // 使用 keys批量注册
        importFn.keys().forEach(path => {
            // 导入组件
            const component = importFn(path).default
            app.component(component.name, component)
        })

        // 定义指令
        defineDirective(app)
        // 如果你想挂载全局的属性，能够通过组件实例调用的属性   this.$message
        app.config.globalProperties.$message = Message // 原型函数
    }
}

const defineDirective = (app) => {
    // 1.图片懒加载指令 v-lazyload
    // 原理：先存储图片地址不挂在src上，当图片进入可视区，将你存储的图片地址给图片元素
    app.directive('lazyload', {
        // vue 2.0 监听使用指令的DOM是否创建好，钩子函数：inserted
        // vue 3.0 的指令拥有的钩子函数和组件一样，使用指令的DOM是否创建好，钩子函数：mounted
        mounted(el, binding) {
            // 2. 创建一个观察对象，来观察当前使用指令的元素
            const observer = new IntersectionObserver(([{ isIntersecting }]) => {
                if (isIntersecting) {
                    // console.log('进入可视区', el)
                    observer.unobserve(el)
                    el.onerror = () => {
                        el.src = defaultImg
                    }
                    el.src = binding.value
                }
            }, {
                threshold: 0.01
            })
            observer.observe(el)
        }
    })
}