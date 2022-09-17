<template>
  <p>{{ todo.todo }}</p>
  <a :href="todo.link" target="_blank">{{ todo.link }}</a>
  <button @click="stopTimer">Leállít</button>
  <button class="done" @click="todo.setDoneToDos">Kész</button>
</template>

<script>
export default {
    props: ['todo'],
    data() {
        return {
            timer: null,
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
            }, 60000)
        },
        stopTimer() {
            clearInterval(this.timer)
        }
    }

}
</script>

<style>
    .done {
        background: #AD4244;
    }
</style>