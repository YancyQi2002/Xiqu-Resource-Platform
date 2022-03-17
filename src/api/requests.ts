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

const requests = axios.create({
    baseURL: import.meta.env.BASE_URL,
    timeout: 10000
})

// 拦截器
requests.interceptors.request.use((config) => {
    config = config || {}
    const user = JSON.parse(localStorage.getItem(KEY_USER_ID) || '') as UserInfo
    if (user.token) {
        config.headers!['Authorization'] = `Bearer ${user.token}`
    }
    return config
})

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