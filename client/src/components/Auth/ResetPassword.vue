<script>
import '../../assets/css/form.css'

export default {}
</script>

<template>
    <form class="form">
        <div class="form__container">
            <h1 class="form__title">Reset your password</h1>
            <div class="form__item">
                <label class="form__label">Email address</label>
                <p class="form__label-description">Please enter your username. We will send a link to reset your password to the email address on file.</p>
                <input
                    class="form__input"
                    type="email"
                >
            </div>
            <div class="form__item">
                <button class="form__send">Reset password</button>
            </div>
        </div>
    </form>
</template>