// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BMap from 'vue-baidu-map'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false

Vue.use(BMap, {
  ak: 'BM7qTEGCkviuX0inNOVIUg1dLyIrnE2p'
})

router.beforeEach((to, from, next) => {
  next({path: '/login'})
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
