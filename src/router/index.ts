import type { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes: RouteRecordRaw[] = []

const modules = import.meta.globEager('./module/*.ts')

for (const path in modules) {
  console.log(modules[path])
  routes.push(...modules[path].default)
}

console.log(routes)

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes //路由表
})

export default router