<template>
  <h1>Teendők</h1>
    <div v-if="todos.length">
      <div v-for="todo in todos" :key="todo.id" class="todo">
        <ToDoDetailView :todo="todo" />
      </div>
    </div>
  </template>
  
  <script>
  import ToDoDetailView from './ToDoDetailView.vue';
  
  export default {
    props: ["todos"],
    data() {
        return {};
    },
    components: { ToDoDetailView }
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