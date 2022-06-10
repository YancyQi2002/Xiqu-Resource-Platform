import './assets/css/index.css'
import './assets/font/font.css'
import '@purge-icons/generated'
import 'flowbite'
import 'bootstrap'
import 'xe-utils'
import 'vue-global-api'

import { createApp } from 'vue'

import axios from 'axios'
import { createPinia } from 'pinia'
import VueAxios from 'vue-axios'
import VXETable from 'vxe-table'

import App from './App.vue'
import router from './router/index'

const pinia = createPinia()

const app: any = createApp(App)
app.config.globalProperties.$axios = axios // 注入 axios
app.use(router).use(pinia).use(VueAxios, axios).use(VXETable)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')