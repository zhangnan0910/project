
// import Vue from 'vue'
import axios from 'axios'

// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();


// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;
// let instance=axios.create({
//   timeout:3000
// })

//请求拦截器
instance.interceptors.request.use((config) => {
  if (process.env.NODE_ENV == 'production') {
    // 真实路径
    config.baseURL = 'https://eip.btte.net'
  } else {
    config.baseURL = 'http://localhost:8080'
  }
  return config
}, (err) => {
  return Promise.reject('err')
})

//响应拦截
instance.interceptors.response.use((response) => {
  if (response.status == 200) {
    return response.data
  } else {
    return Promise.reject(response)
  }
  return response
}, (err) => {
  return 'ERR'
})

//vue插件（好处:防止多次注册）
let httpPlugin = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: instance
    })
  }
}

// defineProperty定义只读 防止$http在将来会被覆盖
// Object.defineProperty(Vue.prototype,'$http',{
//   value:instance
// })

export default httpPlugin