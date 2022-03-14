import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes: any[] = [
  { name: '首页', path: '/', component: () => import('../pages/Home.vue')}
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes //路由表
})

export default router