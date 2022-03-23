import axios from 'axios'

const baseURL = '/api'

export let getUrl = baseURL + '/notion/comments'
export let addUrl = baseURL + '/notion/comments'
export let getUserlist = baseURL + '/users/list'
export let getJingjuList = baseURL + '/dramascript/jingjulist'
export let getPeakingOperalist = baseURL + '/dramascript/peakingoperalist'

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    config.url = baseURL + config.url
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)