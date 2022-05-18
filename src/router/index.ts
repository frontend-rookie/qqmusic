import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: `/recommend`
  },
  {
    path: '/recommend',
    component: () => import('@/views/Recommend/index.vue')
  },{
    path: '/search',
    component: () => import('@/views/SearchDetail/index.vue'),
    children: [

      {
        path: 'song',
        component: () => import('@/views/SearchDetail/Song.vue')
      },
      {
        path: 'mv',
        component: () => import('@/views/SearchDetail/Video.vue')
      },
      {
        path: 'album',
        component: () => import('@/views/SearchDetail/Album.vue')
      }
    ]
  },
  {
    path: `/waiting`,
    component: () => import('@/views/SearchDetail/Waiting.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
