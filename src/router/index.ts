import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: `/recommend`
  },
  {
    path: '/recommend',
    component: () => import('@/views/Recommend/index.vue')
  },
  {
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
      },
      {
        path: `playlist`,
        component: () => import('@/views/SearchDetail/Playlist.vue')
      },
      {
        path: `singer`,
        component: () => import('@/views/SearchDetail/Singer.vue')
      }
    ]
  },
  {
    path: `/waiting`,
    component: () => import('@/views/SearchDetail/Waiting.vue')
  },
  {
    path: `/songlist/:tid`,
    component: () => import('@/views/Songlist/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
