<template>
    <form @submit.prevent="handleSubmit">
      <label>Teendő:</label>
      <textarea required v-model="todo"></textarea>
      <label>Link:</label>
      <input type="url" v-model="link">
  
      <div class="submit">
          <button>Hozzáadás</button>
      </div>
    </form>
    <ToDosView />
  </template>
  
  <script>
  import ToDosView from '@/views/todos/ToDosView.vue';
  import { dbconnection } from '@/composables/firebaseapikey';
  import { collection, addDoc, getDocs } from "firebase/firestore"; 

  export default {
    components: {
        ToDosView
    },
    data() {
        return {
            todo: '',
            link: '',
        }
    },
    async mounted() {
        if(this.$store.state.todos.length > 0) {
            this.$store.commit('setTodosEmpty');
        }
        const querySnapshot = await getDocs(collection(dbconnection, "todos"));
        querySnapshot.forEach((doc) => {
            let todoData = {...doc.data(), docid: doc.id};
            this.$store.commit('addTodo', todoData);
        });
    },
    methods: {
        handleSubmit() {
            let todoData = {todo: this.todo, link: this.link, done: false, owner: this.$store.state.owner, id: Math.random() * 10}
            addDoc(collection(dbconnection, "todos"), todoData);
            this.$store.commit('addTodo', todoData)
            this.todo = '';
            this.link = '';
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
      input, textarea {
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
      button:hover {
        background: #0b6dff;
        opacity: 70%;
      }
      .submit {
          text-align: center;
      }
  </style>