import { createWebHistory, createRouter } from 'vue-router'

import authRouter from './authRoutes'
import appRouter from './appRoutes'

const routes = [
    ...authRouter,
    ...appRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router