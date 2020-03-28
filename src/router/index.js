import Vue from 'vue'
import Router from 'vue-router'
import Main from '../Main.vue'
import Map from '@/components/map/Map'
import Login from '../components/account/Login'
import History from '../components/navigation/History.vue'
import Hazard from '../components/navigation/Hazard.vue'
import AnaHistory from '../components/navigation/dataAnalysis/AnaHistory.vue'
import AnaHazard from '../components/navigation/dataAnalysis/AnaHazard.vue'
import Account from '../components/account/Account'
import SignUp from '../components/account/SignUp'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      rediirect: Login
    },
    {
      path: '/signUp',
      component: SignUp

    },
    {
      path: '/login/:username?',
      component: Login
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: '',
          component: Map
        },
        {
          path: 'history',
          component: History
        },
        {
          path: 'analysis/history',
          component: AnaHistory
        },
        {
          path: 'analysis/hazard',
          component: AnaHazard
        },
        {
          path: 'hazard',
          component: Hazard
        },
        {
          path: 'account/change',
          component: Account
        }
      ]
    }
  ]
})
// 挂载路由导航守卫
// to:将要访问的页面路径
// from:从哪个页面路径跳转而来的
// next:放行函数
router.beforeEach((to, from, next) => {
  if (to.path === '/') { // 用户要访问登录页，不需要设置权限
    next({ path: '/login' })
  }

  if (to.path === '/login') { // 用户要访问登录页，不需要设置权限
    next()
  }
  // 如果要访问的不是登录页，要判断sessionStory里面是否已经存储了token，只有存储了的用户才能访问其他页面
  // let user = JSON.parse(sessionStorage.getItem('user'))
  const tokenStr = window.localStorage.getItem('token')
  if (to.path === '/signUp') {
    next()
  } else if (to.path !== '/login' && !tokenStr) {
    // 强制跳转到登录页
    return next({ path: '/login' })
  }
  next()
})

export default router
