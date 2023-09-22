import '../css/app.css'
import '../scss/app.scss'

import { createApp } from 'vue';
import { store, initStore } from './app/store';
import App from './app/App.vue';

const app = createApp(App);

app.use(store);

if (document.getElementById('app')) {
    initStore();
    app.mount('#app');
}
