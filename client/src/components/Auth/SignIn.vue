<script>
import '../../assets/css/form.css'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    setup() {
        const state = reactive({
            email: '',
            password: ''
        })

        const rules = computed(() => {
            return {
                email: { required, email },
                password: { required, minLength: minLength(6) }
            }
        })

        const v$ = useVuelidate(rules, state)

        return {
            state,
            v$
        }
    },
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
        },
        async signIn() {
            this.v$.$validate()
            if (!this.v$.$error) {
                await this.$store.dispatch('signIn', {
                    email: this.state.email,
                    password: this.state.password
                })
                this.$router.push('/')
            }
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
                <input
                    class="form__input"
                    type="email"
                    v-model.trim="state.email"
                >
                <span class="form__error" v-if="v$.email.$error">
                    {{ v$.email.$errors[0].$message }}
                </span>
            </div>
            <div class="form__item">
                <label>Password</label>
                <input
                    class="form__input"
                    type="password"
                    v-model.trim="state.password"
                >
                <span class="form__error" v-if="v$.password.$error">
                    {{ v$.password.$errors[0].$message }}
                </span>
            </div>
            <div class="form__item">
                <button class="form__send" type="button" @click="signIn">Sign in</button>
            </div>
            <a class="form__forgot-password" @click="goToResetPassword">Forgot password?</a>
            <p class="form__redirect">No account? <a @click="goToSignUp">Sign up</a></p>
        </div>
    </form>
</template>