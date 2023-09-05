import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import { createPinia } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'


import jquery from 'jquery'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zh from "element-plus/es/locale/lang/zh-cn";
import VueAMap from "vue-amap";



const app =createApp(App).use(jquery).use(VueAMap).use(createPinia()).use(store).use(router).use(ElementPlus,{locale:zh})
app.mount('#app')
//配置AOS动态库
app.config.globalProperties.$aos = new AOS.init()


