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
    setDisplay(state) {
      state.display = !state.display;
    },
    setOwner(state, playload) {
      state.owner = playload.user;
      console.log(state.owner, playload.user);
    },
  },
  actions: {},
  modules: {},
});
