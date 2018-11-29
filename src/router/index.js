import Vue from 'vue'
import Router from 'vue-router'

// 使用 Router
Vue.use(Router)

import header from '@/components/header/header'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'header',
      component: header
    }
  ]
})

export default router

