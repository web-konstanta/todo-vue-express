import VueCookies from 'vue-cookies'

import AccountComponent from '@/components/Account/AccountComponent.vue'
import TodoIndex from '@/components/Todo/TodoIndex.vue'
import TodoCreate from '@/components/Todo/TodoCreate.vue'
import TodoUpdate from '@/components/Todo/TodoUpdate.vue'

const protect = () => {
    const accessTokenFromCookie = VueCookies.get('accessToken')
    const accessTokenFromStorage = localStorage.getItem('accessToken')

    return !(!accessTokenFromCookie && !accessTokenFromStorage)
}

const routes = [
    // Account routes
    {
        path: '/account',
        component: AccountComponent,
        beforeEnter: (to, from, next) => {
            if (! protect()) {
                next('/auth/sign-in')
            } else {
                next()
            }
        }
    },
    // Todo routes
    {
        path: '/todo',
        component: TodoIndex,
        beforeEnter: (to, from, next) => {
            if (! protect()) {
                next('/auth/sign-in')
            } else {
                next()
            }
        }
    },
    {
        path: '/todo/create',
        component: TodoCreate,
        beforeEnter: (to, from, next) => {
            if (! protect()) {
                next('/auth/sign-in')
            } else {
                next()
            }
        }
    },
    {
        path: '/todo/update/:id',
        component: TodoUpdate,
        beforeEnter: (to, from, next) => {
            if (! protect()) {
                next('/auth/sign-in')
            } else {
                next()
            }
        }
    }
]

export default routes