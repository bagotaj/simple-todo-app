import { createStore } from 'vuex';
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { dbconnection } from '@/composables/firebaseapikey';

export default createStore({
  state: {
    todos: [],
    display: false,
    owner: null,
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => !todo.done);
    },
  },
  mutations: {
    setTodosEmpty(state) {
      state.todos = [];
    },
    addTodo(state, playload) {
      state.todos.push(playload);
    },
    setDoneTodo(state, playload) {
      state.todos.forEach((todo) => {
        if (todo.id === playload) {
          todo.done = true;
        }
      });
    },
    setDisplay(state, playload) {
      state.display = playload.dvalue;
    },
    setOwner(state, playload) {
      state.owner = playload.user;
    },
  },
  actions: {
    async updateTodoField({ commit, state }, playload) {
      const searchingTodo = query(
        collection(dbconnection, 'todos'),
        where('id', '==', playload.todoId)
      );
      const querySnapshot = await getDocs(searchingTodo);
      querySnapshot.forEach((todo) => {
        const docRef = doc(dbconnection, 'todos', todo.id);
        updateDoc(docRef, playload.done);
        commit('setDoneTodo', playload.todoId);
        state.todos = this.getters.doneTodos;
      });
    },
  },
  modules: {},
});
