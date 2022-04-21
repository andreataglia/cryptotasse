import { getAuth } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardHome from '../views/DashboardHome.vue'
import HostLogin from '../views/HostLogin.vue'
import Register from '../views/Register.vue'

const routes = [
    {
        path: '/',
        name: 'DashboardHome',
        component: DashboardHome,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
