<script>
export default {
    computed: {
        userInfo() {
            return this.$store.state.user
        }
    },
    methods: {
        goToAccount() {
            this.$router.push('/account')
        },
        goToMain() {
            this.$router.push('/')
        },
        signOut() {
            this.$store.dispatch('signOut')
        }
    }
}
</script>

<template>
    <div class="header">
        <ul class="header__menu">
            <li class="header__menu-logo" @click="goToMain">
                <img src="../../assets/icons/logo.png" alt="logo" width="40">
            </li>
            <li class="header__menu-options">
                <button @click="signOut">Sign out</button>
                <button @click="goToAccount">
                    <img
                        class="header__menu-options-avatar"
                        :src="userInfo.avatar || require('../../assets/icons/no-avatar.png')"
                        alt="avatar"
                    >
                </button>
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
    cursor: pointer;
}

.header__menu-options {
    display: flex;
    justify-content: space-between;
    min-width: 150px;
    padding: 10px 15px;
}

.header__menu-options-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
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
