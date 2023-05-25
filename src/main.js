import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './common/router'
import axios from 'axios'
import ECharts from 'vue-echarts'
import 'echarts'
import {createPinia} from 'pinia'
import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'

// axios.defaults.baseURL = "http://localhost:8080"
// 独立API
const { message, notification, dialog } = createDiscreteApi(["message", "dialog", "notification"])

const app = createApp(App)
app.provide('axios', axios)

app.provide("message", message)
app.provide("notification", notification)
app.provide("dialog", dialog)
// app.provide("server_url", axios.defaults.baseURL)
app.component('Echarts', ECharts)

app.use(naive)
app.use(createPinia())

app.use(router)

// axios拦截器
// axios.interceptors.request.use((config)=>{
//     //每次请求都在headers中添加token
//     config.headers.token = adminStore.token
//     return config
// })

app.mount('#app')







