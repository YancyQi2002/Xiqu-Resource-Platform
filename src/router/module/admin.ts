import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] | any = [
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
                path: 'userJurisdiction',
                name: '用户权限',
                component: () => import('@/pages/admin/UserJurisdiction.vue'),
            },
            {
                path: '/admin/changeUserInfo',
                name: '修改用户信息',
                component: () => import('@/components/action/ChangeUserInfo.vue'),
            },
            {
                path: '/admin/changeUserJurisdiction',
                name: '修改用户权限',
                component: () => import('@/components/action/ChangeUserJurisdiction.vue'),
            },
            {
                path: '/admin/deleteUser',
                name: '删除用户',
                component: () => import('@/components/action/DeleteUser.vue'),
            },
            {
                path: 'jingjuList',
                name: '京剧列表',
                icon: 'ep:menu',
                component: () => import('@/pages/admin/JingjuList.vue'),
            },
            {
                path: 'jingjuSingingStyleCollection',
                name: '京剧唱腔板式',
                icon: 'ep:menu',
                component: () => import('@/pages/admin/JingjuSingingStyleCollection.vue'),
            },
            {
                path: 'showJingjuInfo',
                name: '查询京剧详细信息',
                component: () => import('@/components/action/ShowJingjuInfo.vue'),
            },
            {
                path: 'changeJingjuInfo',
                name: '修改京剧详细信息',
                component: () => import('@/components/action/ChangeJingjuInfo.vue'),
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
    }
]

export default routes