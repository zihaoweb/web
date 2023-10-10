import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/reset.css'
import pinia from '@/stores'
// 引入公共样式
import './style/common.scss'
// Element-Plus-Icon
import * as Icons from '@element-plus/icons-vue'
import '@/iconfont/iconfont.css'

const app = createApp(App)

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});


app.use(router)
app.use(pinia)

app.mount('#app')
