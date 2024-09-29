import axios from 'axios'
import store from '@/store'
import router from '@/routes/router'

const appAxios = axios.create({
    withCredentials: true,
    baseURL: `${process.env.VUE_APP_API_URL}/api`,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})

appAxios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error?.status === 401) {
            store.dispatch('refresh')
        } else if (error?.status === 403) {
            localStorage.clear()
            router.push('/auth/sign-in')
        }
    }
)

export default appAxios