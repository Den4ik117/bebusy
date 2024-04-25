import '../css/app.css'
// import '../scss/app.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './echo'

import { createApp } from 'vue';
import { store, initStore } from './app/store';
import App from "./App.vue";
import {createRouter, createWebHistory} from "vue-router";
import {createRoutes} from "./routes.js";
import naive from 'naive-ui'

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: createRoutes(),
})

app.use(store);
app.use(router)
app.use(naive)

initStore()

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

document.querySelector('#app') && app.mount('#app')

