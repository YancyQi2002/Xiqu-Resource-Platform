import type { RouteRecordRaw } from 'vue-router'

const routes :RouteRecordRaw[] = [
    {
        path: '/admin',
        component: () => import('@/pages/Admin.vue')
    }
]

export default routes