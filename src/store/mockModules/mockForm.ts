import { CartFormState } from "@/store/interfaces";

const getters = {
  isValid(state: CartFormState): boolean {
    return state.isValid;
  }
};
const mutations = {
  toggleIsValid: jest.fn()
};

export default {
  namespaced: true,
  getters,
  mutations
};
