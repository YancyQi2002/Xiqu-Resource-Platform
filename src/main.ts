import './assets/css/index.css'
import '@purge-icons/generated'
import 'flowbite'

import { createApp } from 'vue'

import axios from 'axios'
import { createPinia } from 'pinia'
import VueAxios from 'vue-axios'

import 'xe-utils'
import VXETable from 'vxe-table'

import App from './App.vue'
import router from './router/index'

const pinia = createPinia()

const app = createApp(App)
app.config.globalProperties.$axios = axios // 注入 axios
app.use(router).use(pinia).use(VueAxios, axios).use(VXETable)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')