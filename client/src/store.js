import { createStore } from 'vuex'
import authAxios from '@/api/authAxios'

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

                const tokens = response.data

                if (tokens) {
                    localStorage.setItem('accessToken', tokens?.accessToken)
                    commit('setAuth', true)
                    commit('setUser', {
                        name: 'John Doe',
                        email: 'john@gmail.com',
                        verifiedAt: new Date()
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

                const tokens = response.data

                if (tokens) {
                    localStorage.setItem('accessToken', tokens?.accessToken)
                    commit('setAuth', true)
                    commit('setUser', {
                        name: 'John Doe',
                        email: 'john@gmail.com',
                        verifiedAt: null
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
        }
    }
})

export default store