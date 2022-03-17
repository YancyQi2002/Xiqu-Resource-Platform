import axios from 'axios'

import router from '@/router'
import {
  KEY_USER_ID,
  UserInfo
} from '@/store/module/useUserStore'
import {
  NO_PERMISSION,
  OK_CODE
} from '@/utils/keys'

//创建axios的一个实例
const requests = axios.create({
    baseURL: import.meta.env.VITE_API_URL, //接口统一域名
    timeout: 6000, //设置超时
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;',
    }
})

//请求拦截器
requests.interceptors.request.use((config) => {
    config = config || {}
    try{
        const user = JSON.parse(localStorage.getItem(KEY_USER_ID) || '') as UserInfo
        if (user.token) {
            config.headers!['Authorization'] = `Bearer ${user.token}`
        }
    }catch(e){
        console.error(e)
    }
    return config
})

//响应拦截器
requests.interceptors.response.use((resp) => {
    const { code, message } = resp.data || {}
    
    if (code !== OK_CODE) {
        return Promise.reject(message)
    }
    if (code === NO_PERMISSION) {
        router.push({ name: 'Login' }).then()
        return Promise.reject(message)
    }

    return Promise.resolve(resp)
})

export default requests