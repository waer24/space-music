import Vue from 'vue'
import Router from 'vue-router'

// 使用 Router
Vue.use(Router)


import recommend from '@/components/recommend/recommend'

// 按需加载
// const recommend = resolve => require(['@/pages/Driver'], resolve)

const router = new Router({
  mode: 'history',
  routes: [
     {
      path: '/',
      name: 'recommend',
      component: recommend
    }
  ]
})

export default router

