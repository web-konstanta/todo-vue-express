import { createWebHistory, createRouter } from 'vue-router'

import SignUp from './components/Auth/SignUp.vue'
import SignIn from './components/Auth/SignIn.vue'
import ResetPassword from './components/Auth/ResetPassword.vue'
import VerifyAccount from './components/Auth/VerifyAccount.vue'
import AccountComponent from './components/Account/AccountComponent.vue'
import TodoIndex from './components/Todo/TodoIndex.vue'
import TodoCreate from './components/Todo/TodoCreate.vue'
import TodoUpdate from './components/Todo/TodoUpdate.vue'

const routes = [
    { path: '/', redirect: '/todo' },
    // Auth routes
    { path: '/auth/sign-up', component: SignUp },
    { path: '/auth/sign-in', component: SignIn },
    { path: '/reset-password', component: ResetPassword },
    { path: '/verify', component: VerifyAccount },
    // Account route
    { path: '/account', component: AccountComponent },
    // Todo routes
    { path: '/todo', component: TodoIndex },
    { path: '/todo/create', component: TodoCreate },
    { path: '/todo/update/:id', component: TodoUpdate },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router