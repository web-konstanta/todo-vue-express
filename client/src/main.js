import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import vue3GoogleLogin from 'vue3-google-login'
import VueCookies from 'vue-cookies'
import store from './store'

createApp(App)
    .use(VueCookies, { expires: '30d' })
    .use(router)
    .use(vue3GoogleLogin, {
        clientId: 'YOUR_GOOGLE_CLIENT_ID'
    })
    .use(store)
    .mount('#app')