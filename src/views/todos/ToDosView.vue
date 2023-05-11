<template>
  <h1>Teendők</h1>
    <div v-if="$store.state.todos.length" class="container">
      <div v-for="todo in reversedTodos" :key="todo.id" class="todo">
        <ToDoDetailView :todo="todo" />
      </div>
    </div>
    <div v-else>Nincs teendőd!</div>
</template>
  
<script>
  import ToDoDetailView from './ToDoDetailView.vue';
  
  export default {
    components: { ToDoDetailView },
    computed: {
      reversedTodos() {
        return [...this.$store.state.todos].reverse()
      }
    }
  }
 </script>
  
<style>
    .container {
      max-width: 1380px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    @media (max-width: 1024px) {
      .container {
        max-width: 960px;
      }
    }
    @media (max-width: 768px) {
      .container {
        max-width: 480px;
      }
    }
    .todo {
      background: #f4f4f4;
      padding: 20px;
      border-radius: 10px;
      margin: 10px;
      width: 400px;
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