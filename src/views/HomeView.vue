<template>
    <form @submit.prevent="handleSubmit">
      <label>Teendő:</label>
      <input type="text" required v-model="todo">
      <label>Link:</label>
      <input type="url" v-model="link">
  
      <div class="submit">
          <button>Hozzáadás</button>
      </div>
    </form>
    <ToDosView :todos="todos" />
  </template>
  
  <script>
  import ToDosView from '@/views/todos/ToDosView.vue';

  export default {
    components: {
        ToDosView
    },
      data() {
          return {
            todo: '',
            link: '',
            todos: [],
          }
      },
      methods: {
          handleSubmit() {
            this.todos.push({todo: this.todo, link: this.link, id: Math.random() * 10})
            this.todo = '',
            this.link = ''
          }
      }
  }
  </script>
  
  <style>
      form {
          max-width: 420px;
          margin: 30px auto;
          background: white;
          text-align: left;
          padding: 40px;
          border-radius: 10px;
      }
      label {
          color: #454545;
          display: inline-block;
          margin: 25px 0 15px;
          font-size: 0.6em;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: bold;
      }
      input {
          display: block;
          padding: 10px 6px;
          width: 100%;
          box-sizing: border-box;
          border: none;
          border-bottom: 1px solid #ddd;
          color: #454545;
      }
      button {
          background: #0b6dff;
          border: 0;
          padding: 10px 20px;
          margin-top: 20px;
          color: white;
          border-radius: 20px;
          cursor: pointer;
      }
      .submit {
          text-align: center;
      }
  </style>