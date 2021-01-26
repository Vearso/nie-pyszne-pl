import { MenuState } from "@/store/interfaces";

const getters = {
  openedValue(state: MenuState) {
    return state.menuOpened;
  },
  stepValue(state: MenuState) {
    return state.step;
  }
};

const mutations = {
  toggleMenu: jest.fn(),
  prevStep: jest.fn(),
  nextStep: jest.fn(),
  resetOrder: jest.fn()
};

export default {
  namespaced: true,
  getters,
  mutations
};
