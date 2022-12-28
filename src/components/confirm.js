import { createVNode, render } from 'vue'
import XxmConfirm from './xxm-confirm.vue'

// 准备div
const div = document.createElement('div')
div.setAttribute('class', 'confirm-container')
document.body.appendChild(div)

// 该函数渲染XtxConfirm组件，标题和文本
// 函数的返回值是Promise对象
export default ({ title, text }) => {
    return new Promise((resolve, reject) => {
        // 确认
        const submitCallback = () => {
            render(null, div)
            resolve()
        }
        // 取消
        const cancelCallback = () => {
            render(null, div)
            reject(new Error('点击取消'))
        }

        // 1. 渲染组件
        // 2. 点击确认按钮，触发resolve同时销毁组件
        // 3. 点击取消按钮，触发reject同时销毁组件
        const vcode = createVNode(XxmConfirm, { title, text, submitCallback, cancelCallback })
        render(vcode, div)

    })
}