import Vue from 'vue'
import Router from 'vue-router'

// 使用 Router
Vue.use(Router)


import recommend from '@/components/recommend/recommend'
import singer from '@/components/singer/singer'
import rank from '@/components/rank/rank'
import search from '@/components/search/search'


// 按需加载
// const recommend = resolve => require(['@/pages/Driver'], resolve)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
     {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
  ]
})

export default router

