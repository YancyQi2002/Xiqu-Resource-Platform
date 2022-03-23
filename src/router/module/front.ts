import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: '首页',
    path: '/',
    component: () => import('@/pages/Home.vue'),
    children: [
      {
        name: '戏曲',
        path: '/dramascript',
        component: () => import('@/pages/front/Dramascript.vue'),
        children: [
          {
            name: '京剧',
            path: 'jingju',
            component: () => import('@/pages/front/Dramascript/Jingju.vue')
          },
          {
            name: '北京歌剧',
            path: 'peakingopera',
            component: () => import('@/pages/front/Dramascript/PeakingOpera.vue')
          },
        ]
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
