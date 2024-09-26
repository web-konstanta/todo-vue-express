<script>
export default {
  name: "App",
  mounted() {
    if (localStorage.getItem('accessToken')) {
      this.$store.dispatch('userData')
    }
  }
}
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
