import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const Home = () => import('@/views/home')
const Layout = () => import('@/views/Layout')
const TopCategory = () => import('@/views/category/index')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')

// import TopCategory from '@/views/category'
// import SubCategory from '@/views/category'

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path:'/',component: Home },
      { path:'/category/:id',component: TopCategory },
      { path:'/category/sub/:id',component: SubCategory },
      { path:'/product/:id', component: Goods }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 路由延迟滚动
  // 每次切换路由时跳转到顶部
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  },
})


export default router
