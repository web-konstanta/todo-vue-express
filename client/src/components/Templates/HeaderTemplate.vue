<script>
export default {
    methods: {
        goToAccount() {
            this.$router.push('/account')
        }
    }
}
</script>

<template>
    <div class="header">
        <ul class="header__menu">
            <li class="header__menu-logo">Home</li>
            <li class="header__menu-options">
                <button @click="goToAccount">Manage account</button>
                <button>Sign out</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
}

.header {
    width: 100%;
    margin: auto;
}

.menu {
    padding: 5px 15px;
}

.header__menu {
    margin: auto;
    padding: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header__menu-logo {
    padding: 10px 15px;
}

.header__menu-options {
    display: flex;
    justify-content: space-between;
    min-width: 150px;
    padding: 10px 15px;
}

button {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 14px;
    padding: 10px 15px;
}

button:hover {
    background: rgb(245, 245, 245);
}
</style>
