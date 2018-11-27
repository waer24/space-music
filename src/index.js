/* webpack 0 config. index.js is the first entry */

import 'babel-polyfill' // es6语法补丁
import Vue from 'vue' 
import App from './App'

 Vue.config.productionTip = false

// 引入公共的样式
 import style from '@/common/style/test.css'
 import astyle from '@/common/style/test.scss'

 // 引用 router 配置
import router from '@/router/index'

// 引入页面公共js
/* import { someTest } from 'src/common/js/test'
console.log(someTest) */
// import test from 'src/common/js/test.js'
// console.log(test)

 new Vue({
  el: '#root', // index.html
  router,
  components: { App },
  template: '<App/>',
}) 