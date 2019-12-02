import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/map/Map'
import Login from '../components/account/Login'
import History from '../components/navigation/HistoryData.vue'
import Hazard from '../components/navigation/HazardData.vue'
import Analysis from '../components/navigation/Analysis.vue'
// import SignUp from '../components/account/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Map
    },
    {
      path: '/history',
      component: History
    },
    {
      path: '/analysis',
      component: Analysis
    },
    {
      path: '/hazard',
      component: Hazard
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
