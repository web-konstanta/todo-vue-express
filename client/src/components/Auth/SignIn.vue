<template>
    <form class="form">
        <div class="form__container">
            <h1 class="form__title">Sign in</h1>
            <p class="form__subtitle">to continue to application</p>
            <div class="form__item">
                <GoogleLogin
                    :clientId="yourClientId"
                >
                    <button class="form__google-auth">
                        <img class="form__google-icon" src="../../assets/icons/google.svg" alt="google icon">
                        Continue with Google
                    </button>
                </GoogleLogin>
            </div>
            <p class="form__or">or</p>
            <div class="form__item">
                <label>Email address</label>
                <input
                    class="form__input"
                    type="email"
                >
            </div>
            <div class="form__item">
                <label>Password</label>
                <input
                    class="form__input"
                    type="password"
                >
            </div>
            <p class="form__redirect">No account? <a @click="goToSignUp">Sign up</a></p>
        </div>
    </form>
</template>

<script>
import '../../assets/style/form.css'
import { GoogleLogin } from 'vue3-google-login'

export default {
    components: {
        GoogleLogin
    },
    data() {
        return {
            yourClientId: 'YOUR_CLIENT_ID'
        }
    },
    methods: {
        goToSignUp() {
            this.$router.push('/auth/sign-up')
        }
    }
}
</script>