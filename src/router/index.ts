import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
    },
    {
        path: '/question/:id',
        name: 'Question',
        component: () => import('@/views/Question.vue'),
    },
    {
        path: '/result',
        name: 'Result',
        component: () => import('@/views/Result.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
