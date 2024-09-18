<script>
import '../../assets/css/form.css'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    setup() {
        const state = reactive({
            name: '',
            email: '',
            password: ''
        })

        const rules = computed(() => {
            return {
                name: { required, minLength: minLength(2) },
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
        goToSignIn() {
            this.$router.push('/auth/sign-in')
        },
        async auth() {
            const response = await fetch('http://localhost:5000/google/request', { method: 'POST' })
            const data = await response.json()
            window.location.href = data.url
        },
        async signUp() {
            this.v$.$validate()
            if (!this.v$.$error) {
                await this.$store.dispatch('signUp', {
                    name: this.state.name,
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
                <input
                    class="form__input"
                    type="text"
                    v-model.trim="state.name"
                >
                <span class="form__error" v-if="v$.name.$error">
                    {{ v$.name.$errors[0].$message }}
                </span>
            </div>
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
                <button class="form__send" type="button" @click="signUp">Sign up</button>
            </div>
            <p class="form__redirect">Have an account? <a @click="goToSignIn">Sign in</a></p>
        </div>
    </form>
</template>