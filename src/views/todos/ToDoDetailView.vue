<template>
  <p class="right fontsize12">{{ todo.owner }}</p>
  <p>{{ todo.todo }}</p>
  <a :href="todo.link" target="_blank">{{ todo.link }}</a>
  <button @click="stopTimer" :class="{ stoped: stoped }">Leállít</button>
  <button class="done" @click="$store.dispatch('updateTodoField', {todoId: todo.id, done: { done: true }})">Kész</button>
</template>

<script>
export default {
    props: ['todo'],
    data() {
        return {
            timer: null,
            stoped: false,
        }
    },
    mounted() {
        setTimeout(() => {
            this.startTimer()
        })
    },
    methods: {
        startTimer() {
            this.timer = setInterval(() => {
                alert(this.todo.todo)
            }, 600000)
        },
        stopTimer() {
            this.stoped = true;
            clearInterval(this.timer)
        }
    }

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