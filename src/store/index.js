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
    setStopped(state, payload) {
      state.stopped[payload.todoId] = payload.stopped;
    },
    setDoneTodo(state, payload) {
      state.todos.forEach((todo) => {
        if (todo.id === payload) {
          todo.done = true;
        }
      });
    },
    setTodoChanging(state, payload) {
      let objKey = Object.keys(state.todos);

      state.todos.forEach((todo) => {
        if (todo.id === payload.todoId) {
          todo[objKey] = payload[objKey];
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
      const min = 60000;
      const max = 600000;
      const time = Math.floor(Math.random() * (max - min) + min);
      const timerId = setInterval(() => {
        alert(payload.todo);
      }, time);
      state.timers[payload.todoId] = timerId;
    },
    stopTimer(state, payload) {
      state.stopped[payload] = true;
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
        updateDoc(docRef, payload.task);
        if (payload.task.done) {
          commit('setDoneTodo', payload.todoId);
          commit('stopTimer', payload.todoId);
          state.todos = this.getters.doneTodos;
        }
      });
    },
    setTimeout({ commit }, payload) {
      setTimeout(() => {
        commit('startTimer', payload);
      });
      commit('setStopped', { todoId: payload.todoId, stopped: false });
    },
    stopEveryTimers({ commit, state }) {
      let timers = state.timers;
      for (const timer in timers) {
        commit('stopTimer', timer);
      }
    },
  },
  modules: {},
});
