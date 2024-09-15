<script>
import '../../assets/css/form.css'

export default {
    methods: {
        goToSignIn() {
            this.$router.push('/auth/sign-in')
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
            <h1 class="form__title">Create your account</h1>
            <p class="form__subtitle">to continue to application</p>
            <div class="form__item">
                <button type="button" class="form__google-auth" @click="auth">
                    <img class="form__google-icon" src="../../assets/icons/google.svg" alt="google icon">
                    Continue with Google
                </button>
            </div>
            <p class="form__or">or</p>
            <div class="form__item">
                <label>Name</label>
                <input class="form__input" type="text" accept="image/png, image/jpg">
            </div>
            <div class="form__item">
                <label>Email address</label>
                <input class="form__input" type="email">
            </div>
            <div class="form__item">
                <label>Password</label>
                <input class="form__input" type="password">
            </div>
            <div class="form__item">
                <button class="form__send">Sign up</button>
            </div>
            <p class="form__redirect">Have an account? <a @click="goToSignIn">Sign in</a></p>
        </div>
    </form>
</template>