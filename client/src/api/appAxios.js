import axios from 'axios'

const appAxios = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}/api`,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export default appAxios