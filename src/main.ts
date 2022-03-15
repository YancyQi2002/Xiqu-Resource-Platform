import './assets/css/index.css'

import { createApp } from 'vue'

import Axios from 'axios'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'

const pinia = createPinia()

const app = createApp(App)
app.config.globalProperties.$axios = Axios // 注入 axios
app.use(router).use(pinia)
app.mount('#app')