<script>
import HeaderTemplate from '../Templates/HeaderTemplate'

export default {
    components: { HeaderTemplate },
    data() {
        return {
            todo: {
                id: 1,
                title: 'todo title',
                description: 'todo description'
            }
        }
    }
}
</script>

<template>
    <HeaderTemplate/>
    <form class="todo">
        <h1 class="todo__title">Todo update</h1>
        <div class="form__item">
            <label>Title</label>
            <input
                class="form__input"
                type="text"
                v-model="todo.title"
            >
        </div>
        <div class="form__item">
            <label>Description</label>
            <textarea
                class="form__input"
                type="text"
                v-model="todo.description"
            ></textarea>
        </div>
        <div class="form__item">
            <button class="form__send">Save</button>
        </div>
    </form>
</template>