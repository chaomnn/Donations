import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue';

import PaymentForm from './components/PaymentForm.vue'

const routes = [
    {
        path: '/',
        component: PaymentForm,
        meta: {
            title: 'Вольные слушатели'
        }
    }
]

const history = createWebHistory();

const router = new createRouter({
    history,
    routes
});

createApp(App).use(router).mount('#app');
