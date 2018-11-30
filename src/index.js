/* webpack 0 config. index.js is the first entry */

// import 'babel-polyfill' // es6语法补丁
import Vue from 'vue' 
import App from './App'

 Vue.config.productionTip = false

// 引入公共的样式
import '@/common/style/base.sass'
import '@/common/style/variable.sass'
import '@/common/style/mixin.sass'


 // 引用 router 配置
import router from './router'

// 引入页面公共js


 new Vue({
  el: '#root', // index.html
  router,
  components: { App },
  template: '<App/>',
}) 