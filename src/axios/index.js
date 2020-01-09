// 导入axios
import axios from 'axios'
import qs from 'qs'
import global_ from '../util/Global.vue'
// 设置axios的基础地址方便后续编码
// axios.defaults.baseURL = 'http://b9780b1f.ngrok.io'
axios.defaults.baseURL = global_.URL
// 允许axios跨域携带cookie 默认是不携带
axios.defaults.withCredentials = false

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Accept'] = 'text/html;charset=UTF-8'

axios.interceptors.request.use(
  config => {
    if (window.localStorage.getItem('token') !== undefined) {
      const token = window.localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = token
        console.log('interceptors config=', config)
      }
    }
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    console.log('请求出现问题')
    return Promise.error(error)
  })
axios.interceptors.response.use(
  response => {
    console.log('response====')
    console.log(response)
    return response
    // if (response.data.code === 999) {
    //   router.replace('/');
    //   console.log("token过期");
    // }
    // return response;
  },
  error => {
    console.log('服务器错误')
    return Promise.reject(error)
  }
)

export default {
  install (Vue) {
    // 把axios 设置到Vue构造函数的原型上
    Vue.prototype.$http = axios
  }
}
