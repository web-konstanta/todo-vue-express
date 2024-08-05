<script>
export default {
  data() {
    return {
      inputs: [
        {
          label: 'Your name',
          type: 'text',
          name: 'name',
          placeholder: 'Enter your name',
        },
        {
          label: 'Email',
          type: 'email',
          name: 'email',
          placeholder: 'Enter your email',
        },
        {
          label: 'Password',
          type: 'password',
          name: 'password',
          placeholder: 'Enter password',
        },
        {
          label: 'Password confirmation',
          type: 'password',
          name: 'password_confirmation',
          placeholder: 'Confirm your password',
        }
      ]
    }
  }
}
</script>

<template>
  <div class="sign-up">
    <div class="sign-up__title">Create your account</div>
    <form class="sign-up__form">
      <div
          v-for="(input, index) in inputs"
          :key="index"
          class="sign-up__form-item"
      >
        <label class="sign-up__form-label">{{ input.label }}</label>
        <input
            class="sign-up__form-input"
            :type="input.type"
            :name="input.name"
            :placeholder="input.placeholder"
        />
      </div>
      <button class="sign-up__btn" type="submit">Sign up</button>
    </form>
  </div>
</template>

<style>
.sign-up {
  color: #ffffff;
  background-color: #232020;
  font-family: Helvetica, sans-serif;
  border-radius: 10px;
  max-width: 600px;
  margin: 2% auto;
  padding: 20px 0;
}

.sign-up__title {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.sign-up__form {
  max-width: 380px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  background-color: #2a2626;
  border-radius: 10px;
  padding: 0 15px 20px 15px;
}

.sign-up__form-item {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 10px 0;
  border-radius: 10px;
}

.sign-up__form-label {
  font-size: 18px;
}

.sign-up__form-input {
  padding: 7px;
  border-radius: 5px;
  border: none;
  margin-top: 7px;
}

.sign-up__btn {
  margin-top: 25px;
  padding: 7px;
  border-radius: 5px;
  border: none;
  background-color: #4a4ae7;
  color: #ffffff;
  font-size: 16px;
}
</style>