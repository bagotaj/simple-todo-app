<template>
  <p class="right fontsize12">{{ todo.owner }}</p>
  <p v-html="urlMatcherInTodo"></p>
  <a :href="todo.link" target="_blank">{{ todo.link }}</a>
  <button @click="$store.commit('stopTimer', todo.id)" :class="{ stopped: $store.state.stopped[todo.id] }">Leállít</button>
  <button class="done" @click="$store.dispatch('updateTodoField', {todoId: todo.id, done: { done: true }})">Kész</button>
</template>

<script>
export default {
    props: ['todo'],
    mounted() {
        this.$store.dispatch('setTimeout', {todo: this.todo.todo, todoId: this.todo.id});
    },
    computed: {
        urlMatcherInTodo() {
            const URLMatcher = new RegExp('(?:(?:https?|ftp|file)://|www.|ftp.)(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[A-Z0-9+&@#/%=~_|$])', 'igm')
            return this.todo.todo.replace(URLMatcher, match => `<a href="${match}" target="_blank">${match}</a>`)
        }
    },
    unmounted() {
        this.$store.commit('stopTimer', this.todo.id);
    }
}
</script>

<style>
    p {
        white-space: pre-wrap;
        letter-spacing: 1px;
    }
    .stopped {
        pointer-events: none;
        opacity: 0.3;
    }
    .done {
        background: #FF3E24;
    }
    .done:hover {
        background: #FF3E24;
        opacity: 70%;
    }
    .right {
        display: flex;
        justify-content: end;
    }
    .fontsize12 {
        font-size: 12px;
    }
</style>