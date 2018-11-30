import Vue from 'vue'
import Router from 'vue-router'

// 使用 Router
Vue.use(Router)


import recommand from '@/components/recommand/recommand'

// 按需加载
// const recommand = resolve => require(['@/pages/Driver'], resolve)

const router = new Router({
  mode: 'history',
  routes: [
     {
      path: '/',
      name: 'recommand',
      component: recommand
    }
  ]
})

export default router

