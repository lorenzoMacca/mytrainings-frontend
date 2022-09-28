import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';


const app = createApp(App)

app.use(router)
app.mount('#app')