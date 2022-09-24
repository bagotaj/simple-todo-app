<template>
  <p class="right fontsize12">{{ todo.owner }}</p>
  <p>{{ todo.todo }}</p>
  <a :href="todo.link" target="_blank">{{ todo.link }}</a>
  <button @click="$store.commit('stopTimer', todo.id)" :class="{ stoped: $store.state.stoped }">Leállít</button>
  <button class="done" @click="$store.dispatch('updateTodoField', {todoId: todo.id, done: { done: true }})">Kész</button>
</template>

<script>
export default {
    props: ['todo'],
    mounted() {
        this.$store.dispatch('setTimeout', {todo: this.todo.todo, todoId: this.todo.id});
    },
}
</script>

<style>
    .stoped {
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