import {
  createRouter,
  createWebHistory
} from 'vue-router'

const Home = () => import('@/views/home')
const Layout = () => import('@/Layout')
const TopCategory = () => import('@/views/category/index')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')
const Login = () => import('@/views/login/index')
const Register = () => import('@/views/register/index')
const Cart = () => import('@/views/cart/index')

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    // 二级路由
    children: [
      { path:'/',component: Home },
      { path:'/category/:id',component: TopCategory },
      { path:'/category/sub/:id',component: SubCategory },
      { path:'/product/:id', component: Goods },
      { path:'/cart', component: Cart }
    ]
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/login',
    component: Login,
  }
]

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');
  
//     if (token === null || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// })


const router = createRouter({
  history: createWebHistory(),
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
