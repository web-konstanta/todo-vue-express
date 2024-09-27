import axios from 'axios'
import store from '@/store'

const appAxios = axios.create({
    withCredentials: true,
    baseURL: `${process.env.VUE_APP_API_URL}/api`,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})

appAxios.interceptors.response.use(
    (response) => {
        console.log(response)
        return response
    },
    (error) => {
        if (error?.status === 401) {
            store.dispatch('refresh')
        }
    }
)

export default appAxios