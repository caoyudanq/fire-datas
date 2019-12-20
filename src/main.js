// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Home from './Home.vue'
import router from './router'
import BMap from 'vue-baidu-map'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
// 导入抽取的axios
import axios from './axios/index'
Vue.use(axios)

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false

Vue.use(BMap, {
  ak: 'BM7qTEGCkviuX0inNOVIUg1dLyIrnE2p'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { Home },
  template: '<Home/>'
  // withCredentials: true
})
// 定义一个全局过滤器

Vue.filter('dataFormat', function (input, pattern = '') {
  var dt = new Date(input)
  // 获取年月日
  var y = dt.getFullYear()
  var m = (dt.getMonth() + 1).toString().padStart(2, '0')
  var d = dt.getDate().toString().padStart(2, '0')
  // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
  // 否则，就返回  年-月-日 时：分：秒
  if (pattern.toLowerCase() === 'yyyy-mm-dd') {
    return `${y}-${m}-${d}`
  } else {
    // 获取时分秒
    var hh = dt.getHours().toString().padStart(2, '0')
    var mm = dt.getMinutes().toString().padStart(2, '0')
    var ss = dt.getSeconds().toString().padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
})
