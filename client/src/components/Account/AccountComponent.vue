<script>
import '../../assets/css/account.css'
import HeaderTemplate from '../Templates/HeaderTemplate'

export default {
    components: { HeaderTemplate }
}
</script>

<template>
    <HeaderTemplate />
    <div class="account">
        <div class="account__greet">Hello, John Doe!</div>
        <div class="account__subgreet">Welcome to your account</div>
        <div class="personal">
            <form class="avatar" enctype="multipart/form-data">
                <img class="avatar__image" src="../../assets/icons/no-avatar.png" alt="no avatar">
                <label>Select avatar</label>
                <input type="file" class="avatar__input">
                <button class="avatar__save">Change avatar</button>
            </form>
            <div class="security">
                <form class="security__data">
                    <div class="security__data-title">Personal data</div>
                    <div class="security__data-input">
                        <label>Your name</label>
                        <input type="text" value="John Doe">
                    </div>
                    <div class="security__data-input">
                        <label>Your email</label>
                        <input type="text" value="john@gmail.com">
                    </div>
                    <button class="security__data-save">Save data</button>
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
                    <button class="security__data-save">Change password</button>
                </div>
            </div>
        </div>
    </div>
</template>