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
    timers: {},
    stopped: {},
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
    addTodo(state, payload) {
      state.todos.push(payload);
    },
    setStoped(state, payload) {
      state.stopped[payload.todoId] = payload.stopped;
    },
    setDoneTodo(state, payload) {
      state.todos.forEach((todo) => {
        if (todo.id === payload) {
          todo.done = true;
        }
      });
    },
    setDisplay(state, payload) {
      state.display = payload.dvalue;
    },
    setOwner(state, payload) {
      state.owner = payload.user;
    },
    startTimer(state, payload) {
      console.log('startTimer', payload);
      const timerId = setInterval(() => {
        alert(payload.todo);
      }, 600000);
      state.timers[payload.todoId] = timerId;
    },
    stopTimer(state, payload) {
      state.stopped[payload] = true;
      console.log('stopTimer', payload);
      clearInterval(state.timers[payload]);
    },
  },
  actions: {
    async updateTodoField({ commit, state }, payload) {
      const searchingTodo = query(
        collection(dbconnection, 'todos'),
        where('id', '==', payload.todoId)
      );
      const querySnapshot = await getDocs(searchingTodo);
      querySnapshot.forEach((todo) => {
        const docRef = doc(dbconnection, 'todos', todo.id);
        updateDoc(docRef, payload.done);
        commit('setDoneTodo', payload.todoId);
        commit('stopTimer', payload.todoId);
        state.todos = this.getters.doneTodos;
      });
    },
    setTimeout({ commit }, payload) {
      setTimeout(() => {
        commit('startTimer', payload);
      });
      commit('setStoped', { todoId: payload.todoId, stopped: false });
    },
  },
  modules: {},
});
