import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

createApp(App)
    .use(vue3GoogleLogin, {
        clientId: 'YOUR_GOOGLE_CLIENT_ID'
    })
    .use(router)
    .mount('#app')