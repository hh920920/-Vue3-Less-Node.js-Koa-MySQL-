import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-plus';//导入组件库
import 'element-plus/theme-chalk/index.css';//导入组件相关样式

// 1. 重置样式的库
import 'normalize.css'
// 2. 自定义的重置样式的公用样式
import '@/assets/styles/common.less'

// 使用自定骨架屏插件
import ui from './components'

createApp(App).use(store).use(router).use(ui).use(ElementUI).mount('#app')
