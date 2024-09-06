import { createWebHistory, createRouter } from 'vue-router'

import SignUp from './components/Auth/SignUp.vue'
import SignIn from './components/Auth/SignIn.vue'

const routes = [
    { path: '/auth/sign-up', component: SignUp },
    { path: '/auth/sign-in', component: SignIn },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router