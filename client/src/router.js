import { createWebHistory, createRouter } from 'vue-router'

import SignUp from './components/Auth/SignUp.vue'
import SignIn from './components/Auth/SignIn.vue'
import ResetPassword from './components/Auth/ResetPassword.vue'
import VerifyAccount from './components/Auth/VerifyAccount.vue'
import AccountMain from './components/Account/AccountMain.vue'

const routes = [
    { path: '/', redirect: '/auth/sign-in' },
    // Auth routes
    { path: '/auth/sign-up', component: SignUp },
    { path: '/auth/sign-in', component: SignIn },
    { path: '/reset-password', component: ResetPassword },
    { path: '/verify', component: VerifyAccount },
    // Account routes
    { path: '/account', component: AccountMain }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router