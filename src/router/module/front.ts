import type { RouteRecordRaw } from 'vue-router'

const routes :RouteRecordRaw[] = [
    {
        name: '首页',
        path: '/',
        component: () => import('@/pages/Home.vue'),
        children: [
            {
                name: '京剧',
                path: 'jingju',
                component: () => import('@/pages/front/Jingju.vue')
            },
            {
                name: '留言板',
                path: 'messageboard',
                component: () => import('@/pages/front/MessageBoard.vue')
            },
            {
                name: '关于',
                path: 'about',
                component: () => import('@/pages/front/About.vue')
            }
        ]
    }
]

export default routes