// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BMap from 'vue-baidu-map'

Vue.config.productionTip = false

Vue.use(BMap, {
  ak: 'BM7qTEGCkviuX0inNOVIUg1dLyIrnE2p'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
