import { MenuState } from "@/store/interfaces";

const state: MenuState = {
  menuOpened: false,
  step: 1
};

const getters = {
  openedValue(state: MenuState) {
    return state.menuOpened;
  },
  stepValue(state: MenuState) {
    return state.step;
  }
};

const mutations = {
  toggleMenu(state: MenuState): void {
    state.menuOpened = !state.menuOpened;
  },
  prevStep(state: MenuState): void {
    state.step -= 1;
  },
  nextStep(state: MenuState): void {
    state.step += 1;
  },
  resetOrder(state: MenuState) {
    state.step = 1;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
