import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/question/:id',
        name: 'Question',
        component: () => import('../views/Question.vue'),
    },
    {
        path: '/result',
        name: 'Result',
        component: () => import('../views/Result.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(typeof process !== 'undefined' ? process.env.BASE_URL : undefined),
    routes,
})

export default router
