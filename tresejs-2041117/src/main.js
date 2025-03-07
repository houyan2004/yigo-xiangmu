import { createApp } from 'vue'
import './style.scss'
import Tres from '@tresjs/core'
import App from './App.vue'
import router from "./router/index.js";
import './assets/tailwind.css';
import 'element-plus/dist/index.css'
import persistedstate from 'pinia-plugin-persistedstate';
import {createPinia} from "pinia"
import Echarts from "vue-echarts"
import * as echarts from "echarts"


const pinia = createPinia()
pinia.use(persistedstate)
const app = createApp(App)
app.component("v-chart", Echarts)
app.config.globalProperties.$echarts = echarts
app.use(pinia)
app.use(Tres)
app.use(router)
app.mount("#app")
