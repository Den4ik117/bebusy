import '../css/app.css'
import '../scss/app.scss'
import './bootstrap'

import { createApp } from 'vue';
import { store, initStore } from './app/store';
import HomePage from "@/pages/HomePage.vue";
import App from "./App.vue";
import {createRouter, createWebHistory} from "vue-router";
import {createRoutes} from "./routes.js";

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: createRoutes(),
})

app.use(store);
app.use(router)

initStore()

document.querySelector('#app') && app.mount('#app')

