/* webpack 0 config. index.js is the first entry */

// import 'babel-polyfill' // es6语法补丁
import Vue from 'vue' 
import App from './App'
import store from './store'
import router from './router' // 引用 router 配置
import fastClick from 'fastclick'  // 引入页面公共js

 Vue.config.productionTip = false

// 引入公共的样式
import '@/common/style/base.scss'
import '@/common/style/variable.scss'
import '@/common/style/mixin.scss'


// 取消300ms的延迟
fastClick.attach(document.body)

 new Vue({
  el: '#root', // index.html
  router,
  store,
  render: h => h(App)
  
}) 