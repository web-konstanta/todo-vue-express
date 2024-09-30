<script>
import '../../assets/css/account.css'
import HeaderTemplate from '../Templates/HeaderTemplate'

export default {
    components: { HeaderTemplate },
    computed: {
        userInfo() {
            return this.$store.state.user
        }
    }
}
</script>

<template>
    <HeaderTemplate />
    <div class="account">
        <div class="account__greet">Hello, {{ userInfo.name }}!</div>
        <div class="account__subgreet">Welcome to your account</div>
        <div class="personal">
            <form class="avatar" enctype="multipart/form-data">
                <img
                    class="avatar__image"
                    :src="userInfo.avatar || require('../../assets/icons/no-avatar.png')"
                    alt="no avatar"
                >
                <label>Select avatar</label>
                <input type="file" class="avatar__input">
                <button type="button" class="avatar__save">Change avatar</button>
            </form>
            <div class="security">
                <form class="security__data">
                    <div class="security__data-title">Personal data</div>
                    <div class="security__data-input">
                        <label>Your name</label>
                        <input
                            type="text"
                            v-model="userInfo.name"
                        >
                    </div>
                    <div class="security__data-input">
                        <label>Your email</label>
                        <input
                            type="text"
                            v-model="userInfo.email"
                        >
                    </div>
                    <button type="button" class="security__data-save">Save data</button>
                </form>
                <div class="security__reset-password">
                    <div class="security__data-title">Reset password</div>
                    <div class="security__data-input">
                        <label>Current password</label>
                        <input type="password">
                    </div>
                    <div class="security__data-input">
                        <label>New password</label>
                        <input type="password">
                    </div>
                    <div class="security__data-input">
                        <label>Current password</label>
                        <input type="password">
                    </div>
                    <button type="button" class="security__data-save">Change password</button>
                </div>
            </div>
        </div>
    </div>
</template>