<script>
import '../../assets/css/todo.css'
import HeaderTemplate from '../Templates/HeaderTemplate'

export default {
    components: { HeaderTemplate },
    data() {
        return {
            todos: [
                {
                    id: 1,
                    title: 'first todo',
                    description: 'first todo description',
                    isDone: false
                },
                {
                    id: 2,
                    title: 'second todo',
                    description: 'second todo description',
                    isDone: true
                },
                {
                    id: 3,
                    title: 'third todo',
                    description: 'third todo description',
                    isDone: false
                }
            ]
        }
    },
    methods: {
        markAsDone(todoId) {
            console.log(`Todo №${todoId} done`)
        },
        goToUpdate(todoId) {
            this.$router.push('/todo/update/' + todoId)
        },
        deleteTodo(index, todoId) {
            console.log(`Todo №${todoId} deleted`)
            this.todos.splice(index, 1)
        }
    }
}
</script>

<template>
    <HeaderTemplate/>
    <div class="todo">
        <h1 class="todo__title">Todo list</h1>
        <table class="table" v-if="todos.length">
            <thead>
                <tr>
                    <th class="table__number">№</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th class="table__options">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(todo, index) of todos"
                    :key="index"
                >
                    <td>{{ todo.id }}</td>
                    <td
                        :class="todo.isDone ? 'todo__done' : ''"
                    >{{ todo.title }}</td>
                    <td
                        :class="todo.isDone ? 'todo__done' : ''"
                    >{{ todo.description }}</td>
                    <td class="table__options-item">
                        <input
                            class="table__options-checkbox"
                            type="checkbox"
                            v-model="todo.isDone"
                            @click="markAsDone(todo.id)"
                        >
                        <div class="table__option" @click="goToUpdate(todo.id)">
                            <img
                                src="../../assets/icons/update.png"
                                alt="update todo"
                            >
                        </div>
                        <div class="table__option">
                            <img
                                src="../../assets/icons/delete.png"
                                alt="delete todo"
                                @click="deleteTodo(index, todo.id)"
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="table__empty">Todo list is empty</div>
    </div>
</template>