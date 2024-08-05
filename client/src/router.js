import { createWebHistory, createRouter } from 'vue-router'

import SignIn from '@/components/Auth/SignIn.vue'
import SignUp from '@/components/Auth/SignUp.vue'
import TodoIndex from '@/components/Todo/TodoIndex.vue'
import TodoShow from '@/components/Todo/TodoShow.vue'
import TodoCreate from '@/components/Todo/TodoCreate.vue'
import TodoUpdate from '@/components/Todo/TodoUpdate.vue'

const routes = [
    { path: '/', redirect: '/sign-in' },
    { path: '/sign-in', component: SignIn },
    { path: '/sign-up', component: SignUp },
    { path: '/todo', component: TodoIndex },
    { path: '/todo/:id', component: TodoShow },
    { path: '/todo/create', component: TodoCreate },
    { path: '/todo/update/:id', component: TodoUpdate }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router