import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/map/Map'
import Login from '../components/account/Login'
import SignUp from '../components/account/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Map,
      children: [
        {
          path: 'login',
          components: Login
        },
        {
          path: 'singup',
          component: SignUp
        }
      ]
    }
  ]
})
