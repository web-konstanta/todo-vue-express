import SignUp from '@/components/Auth/SignUp.vue'
import SignIn from '@/components/Auth/SignIn.vue'
import ResetPassword from '@/components/Auth/ResetPassword.vue'
import VerifyAccount from '@/components/Auth/VerifyAccount.vue'

const routes = [
    { path: '/', redirect: '/todo' },
    // Auth routes
    {
        path: '/auth/sign-up',
        component: SignUp,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('accessToken')) {
                next('/todo')
            } else {
                next()
            }
        }
    },
    {
        path: '/auth/sign-in',
        component: SignIn,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('accessToken')) {
                next('/todo')
            } else {
                next()
            }
        }
    },
    {
        path: '/reset-password',
        component: ResetPassword,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('accessToken')) {
                next('/todo')
            } else {
                next()
            }
        }
    },
    {
        path: '/verify',
        component: VerifyAccount,
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem('accessToken')) {
                next('/auth/sign-in')
            } else {
                next()
            }
        }
    }
]

export default routes