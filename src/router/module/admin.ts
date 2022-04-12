import type { RouteRecordRaw } from 'vue-router'

const routes :RouteRecordRaw[] | any = [
    {
        path: '/admin',
        redirect: { name: '控制面板' },
        component: () => import('@/pages/Admin.vue'),
        children: [
            {
                path: 'dashboard',
                name: '控制面板',
                icon: 'ep:menu',
                component: () => import('@/pages/admin/Dashboard.vue'),
            },
            {
                path: 'userList',
                name: '用户列表',
                icon: 'ep:menu',
                component: () => import('@/pages/admin/UserList.vue'),
            },
            {
                path: 'about',
                name: '关于后台',
                icon: 'entypo:info',
                component: () => import('@/pages/admin/About.vue'),
            }
        ]
    },
    {
        path: '/admin/changeUserPassword',
        name: '修改密码',
        component: () => import('@/components/action/ChangeUserPassword.vue'),
    },
    {
        path: '/admin/changeUserInfo',
        name: '修改用户信息',
        component: () => import('@/components/action/ChangeUserInfo.vue'),
    }
]

export default routes