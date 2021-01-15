import { CartFormState } from "@/store/interfaces";

const state: CartFormState = {
  fullName: "",
  mail: "",
  phone: 0,
  city: "",
  street: "",
  postCode: "",
  isValid: false
};
const getters = {
  isValid(state: CartFormState): boolean {
    return state.isValid;
  }
};
const mutations = {
  toggleIsValid: function(state: CartFormState): void {
    state.isValid = !state.isValid;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};