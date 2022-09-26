<template>
  <h1>Teendők</h1>
    <div v-if="$store.state.todos.length">
      <div v-for="todo in reversedTodos" :key="todo.id">
        <div v-if="!todo.done" class="todo">
          <ToDoDetailView :todo="todo" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ToDoDetailView from './ToDoDetailView.vue';
  
  export default {
    data() {
        return {};
    },
    components: { ToDoDetailView },
    computed: {
      reversedTodos() {
        return [...this.$store.state.todos].reverse()
      }
    }
}
  </script>
  
  <style>
    .todo {
      background: #f4f4f4;
      padding: 20px;
      border-radius: 10px;
      margin: 10px auto;
      max-width: 420px;
      color: #454545;
      display: flex;
      flex-direction: column;
    }
    .todo a {
      text-decoration: none;
      color:#FF3E24;
      cursor: pointer;
    }
  </style>