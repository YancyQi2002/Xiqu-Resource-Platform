import type { RouteRecordRaw } from 'vue-router'

const routes :RouteRecordRaw[] = [
    {
        name: '首页',
        path: '/',
        component: () => import('@/pages/Home.vue')
    }
]

export default routes