import { createStore } from "vuex";
export default createStore({
  state: {
    menuOpened: false
  },
  mutations: {
    toggleMenu(state) {
      state.menuOpened = !state.menuOpened;
    }
  },
  actions: {},
  modules: {}
});
