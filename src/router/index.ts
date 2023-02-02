import {
  RouteRecordRaw,
  createRouter,
  createWebHistory,
} from 'vue-router'

const routes: RouteRecordRaw[] = []

const modules = import.meta.globEager('./module/*.ts')

for (const path in modules) {
  // @ts-ignore
  routes.push(...modules[path].default)
}

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes //路由表
})

export default router