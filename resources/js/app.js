import '../css/app.css'
import '../scss/app.scss'

import { createApp } from 'vue';
import { store, initStore } from './app/store';
import HomePage from "@/pages/HomePage.vue";

const app = createApp(HomePage);

app.use(store);

if (document.getElementById('app')) {
    initStore();
    app.mount('#app');
}
