import { createStore } from 'vuex'
import authAxios from '@/api/authAxios'
import appAxios from '@/api/appAxios'

const store = createStore({
    state: {
        user: {},
        isAuth: false
    },
    mutations: {
        setAuth(state, value) {
            state.isAuth = value
        },
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        async signIn({ commit }, payload) {
            try {
                const response = await authAxios.post('/sign-in', {
                    email: payload.email,
                    password: payload.password
                })

                const tokens = response.data?.tokens
                const userData = response.data?.user

                if (tokens) {
                    localStorage.setItem('accessToken', tokens?.accessToken)
                    localStorage.setItem('isVerified', !!userData?.verifiedAt)

                    commit('setAuth', true)
                    commit('setUser', {
                        name: userData?.name,
                        email: userData?.email,
                        verifiedAt: userData?.verifiedAt
                    })
                }
            } catch (e) {
                console.error(e)
                const errorMessage = e.response?.data?.message
                if (errorMessage) {
                    if (!document.querySelector('.form__server-error')) {
                        document.querySelector('.form__or').insertAdjacentHTML('afterend', `
                            <span class="form__server-error">${errorMessage}</span>
                        `)
                    } else {
                        document.querySelector('.form__server-error').textContent = errorMessage
                    }
                }
            }
        },
        async signUp({ commit }, payload) {
            try {
                const response = await authAxios.post('/sign-up', {
                    name: payload.name,
                    email: payload.email,
                    password: payload.password
                })

                const tokens = response.data?.tokens
                const userData = response.data?.user

                if (tokens) {
                    localStorage.setItem('accessToken', tokens?.accessToken)
                    localStorage.setItem('isVerified', !!userData?.verifiedAt)

                    commit('setAuth', true)
                    commit('setUser', {
                        name: userData?.name,
                        email: userData?.email,
                        verifiedAt: userData?.verifiedAt
                    })
                }
            } catch (e) {
                console.error(e)
                const errorMessage = e.response?.data?.message
                if (errorMessage) {
                    if (!document.querySelector('.form__server-error')) {
                        document.querySelector('.form__or').insertAdjacentHTML('afterend', `
                            <span class="form__server-error">${errorMessage}</span>
                        `)
                    } else {
                        document.querySelector('.form__server-error').textContent = errorMessage
                    }
                }
            }
        },
        async refresh({ commit }) {
            try {
                const response = await authAxios.post('/refresh')

                const tokens = response.data?.tokens

                if (tokens) {
                    localStorage.setItem('accessToken', tokens?.accessToken)
                }

                commit('setAuth', true)
                window.location.reload()
            } catch (e) {
                console.log(e)
            }
        },
        async userData({ commit }) {
            try {
                const response = await appAxios.get('/account/data')
                const userData = response.data?.data

                localStorage.setItem('isVerified', !!userData?.verifiedAt)

                commit('setUser', {
                    name: userData?.name,
                    email: userData?.email,
                    verifiedAt: userData?.verifiedAt
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
})

export default store