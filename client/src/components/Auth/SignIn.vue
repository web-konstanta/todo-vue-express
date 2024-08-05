<script>
export default {
  data() {
    return {
      inputs: [
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
        }
      ]
    }
  }
}
</script>

<template>
  <div class="sign-in">
    <div class="sign-in__title">Sign in your account</div>
    <form class="sign-in__form">
      <div
          v-for="(input, index) in inputs"
          :key="index"
          class="sign-in__form-item"
      >
        <label class="sign-in__form-label">{{ input.label }}</label>
        <input
            class="sign-in__form-input"
            :type="input.type"
            :name="input.name"
            :placeholder="input.placeholder"
        />
      </div>
      <button class="sign-in__btn" type="submit">Sign in</button>
    </form>
  </div>
</template>

<style>
.sign-in {
  color: #ffffff;
  background-color: #232020;
  font-family: Helvetica, sans-serif;
  border-radius: 10px;
  max-width: 600px;
  margin: 7% auto;
  padding: 20px 0;
}

.sign-in__title {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.sign-in__form {
  max-width: 380px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  background-color: #2a2626;
  border-radius: 10px;
  padding: 0 15px 20px 15px;
}

.sign-in__form-item {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 10px 0;
  border-radius: 10px;
}

.sign-in__form-label {
  font-size: 18px;
}

.sign-in__form-input {
  padding: 7px;
  border-radius: 5px;
  border: none;
  margin-top: 7px;
}

.sign-in__btn {
  margin-top: 25px;
  padding: 7px;
  border-radius: 5px;
  border: none;
  background-color: #4a4ae7;
  color: #ffffff;
  font-size: 16px;
}
</style>