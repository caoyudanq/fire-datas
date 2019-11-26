import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/map/Map'
// import Home from '@/components/web/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: { 'map': Map }
    }
  ]
})
