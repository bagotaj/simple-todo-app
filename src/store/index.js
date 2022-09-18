import { createStore } from 'vuex';

export default createStore({
  state: {
    todos: [],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
