<script>
import '../../assets/css/form.css'

export default {
    methods: {
        goToSignUp() {
            this.$router.push('/auth/sign-up')
        },
        goToResetPassword() {
            this.$router.push('/reset-password')
        },
        async auth() {
            const response = await fetch('http://localhost:5000/google/request', { method: 'POST' })
            const data = await response.json()
            window.location.href = data.url
        }
    }
}
</script>

<template>
    <form class="form">
        <div class="form__container">
            <h1 class="form__title">Sign in</h1>
            <p class="form__subtitle">to continue to application</p>
            <div class="form__item">
                <button type="button" class="form__google-auth" @click="auth">
                    <img class="form__google-icon" src="../../assets/icons/google.svg" alt="google icon">
                    Continue with Google
                </button>
            </div>
            <p class="form__or">or</p>
            <div class="form__item">
                <label>Email address</label>
                <input class="form__input" type="email">
            </div>
            <div class="form__item">
                <label>Password</label>
                <input class="form__input" type="password">
            </div>
            <div class="form__item">
                <button class="form__send">Sign in</button>
            </div>
            <a class="form__forgot-password" @click="goToResetPassword">Forgot password?</a>
            <p class="form__redirect">No account? <a @click="goToSignUp">Sign up</a></p>
        </div>
    </form>
</template>