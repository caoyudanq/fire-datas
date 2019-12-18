// 导入axios
import axios from 'axios'
// import http from './http'

// 设置axios的基础地址方便后续编码
// axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.baseURL = 'http://127.0.0.1:8080'
// 允许axios跨域携带cookie 默认是不携带
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = window.sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.error(error)
  })
export default {
  install (Vue) {
    // 把axios 设置到Vue构造函数的原型上
    Vue.prototype.$http = axios
    // Vue.prototype.$http = http
  }
}
