import axios from 'axios'

const authAxios = axios.create({
    withCredentials: true,
    baseURL: `${process.env.VUE_APP_API_URL}/api/auth`
})

export default authAxios