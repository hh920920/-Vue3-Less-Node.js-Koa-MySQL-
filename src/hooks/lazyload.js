// 全局指令
export default  (app) => {
    // 1.图片懒加载指令 v-lazyload
    // 原理：先存储图片地址不挂在src上，当图片进入可视区，将你存储的图片地址给图片元素
    app.directive('lazyload', {
        // vue 2.0 监听使用指令的DOM是否创建好，钩子函数：inserted
        // vue 3.0 的指令拥有的钩子函数和组件一样，使用指令的DOM是否创建好，钩子函数：mounted
        mounted(el, binding) {
            // console.log(el);
            // 2. 创建一个观察对象，来观察当前使用指令的元素
            // isIntersecting判断是否进入视图
            const observer = new IntersectionObserver(([{ isIntersecting }]) => {
                if (isIntersecting) {
                    // console.log('进入可视区', el)
                    // // 进入视图后，停止监听
                    observer.unobserve(el)
                    // 加载失败显示默认图片
                    el.onerror = () => {
                        el.src = defaultImg
                    }
                    // 进入视图后，把指令绑定的值赋值给src属性，显示图片
                    el.src = binding.value
                }
            }, {
                // 当图片img元素占比视图0.01时 el.src = binding.value
                threshold: 0.01 
            })
            // 观察指令绑定的dom
            observer.observe(el)
        }
    })
}