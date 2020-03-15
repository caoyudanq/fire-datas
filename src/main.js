// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Home from './Home.vue'
import router from './router'
import BMap from 'vue-baidu-map'
import ElementUI from './assets/js/element'
import '../theme/index.css'
// import './element-variables.scss'
// import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
import common from './util/common'
// 导入抽取的axios
import axios from './axios/index'
import VueCookie from 'vue-cookies'
import echarts from 'echarts'
Vue.use(axios)
Vue.use(VueCookie)

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
  components: {Home},
  template: '<Home/>'
})
Vue.prototype.COMMON = common
Vue.prototype.$echarts = echarts
