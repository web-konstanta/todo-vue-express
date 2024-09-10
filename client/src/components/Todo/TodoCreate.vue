<script>
import '../../assets/css/form.css'
import HeaderTemplate from '../Templates/HeaderTemplate'

export default {
    components: { HeaderTemplate }
}
</script>

<template>
    <HeaderTemplate />
    <form class="todo">
        <h1 class="todo__title">Todo create</h1>
        <div class="form__item">
            <label>Title</label>
            <input class="form__input" type="text">
        </div>
        <div class="form__item">
            <label>Description</label>
            <textarea class="form__input" type="text"></textarea>
        </div>
        <div class="form__item">
            <button class="form__send">Save</button>
        </div>
    </form>
</template>