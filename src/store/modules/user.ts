import { UserState } from "@/store/interfaces";

const state: UserState = {
  name: "",
  email: ""
};
const mutations = {
  setUpUser(state: UserState, user: any) {
    state.name = user.name;
    state.email = user.email;
  },
  clearUser(state: UserState) {
    state.name = "";
    state.email = "";
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
