import { createStore } from 'vuex';

export default createStore({
  state: {
    todos: [],
    display: false,
    owner: null,
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
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
        if (todo.id === playload.id) {
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
  actions: {},
  modules: {},
});
