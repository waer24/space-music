import Vue from 'vue'
import Router from 'vue-router'

// 使用 Router
Vue.use(Router)

/* 
每一个vue单页面都是使用import引用进来的，它不会进行页面懒加载的，
所以在打包的时候都会打包到bundle.js文件内，
因此文件会变得越来越大。因此我们需要使用 require.ensure()实现按需加载。
 */

 // 按需加载简写
// const recommend = resolve => require(['@/pages/Driver'], resolve)

 //  按需加载
const recommend = (resolve) => {
  import ('@/components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const disc = (resolve) => {
  import ('@/components/disc/disc').then((module) => {
    resolve(module)
  })
}

const singer = (resolve) => {
  import ('@/components/singer/singer').then((module) => {
    resolve(module)
  })
}


const rank = (resolve) => {
  import ('@/components/rank/rank').then((module) => {
    resolve(module)
  })
}

const search = (resolve) => {
  import ('@/components/search/search').then((module) => {
    resolve(module)
  })
}

const singerDetail = (resolve) => {
  import ('@/components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}


const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
     {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id', 
          component: disc,
        }
      ],
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/singer',
     // name: 'singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
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

