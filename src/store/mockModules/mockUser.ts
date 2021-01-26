import { UserState, FormValues } from "@/store/interfaces";
import { auth, db } from "@/utilities/firebase";
import { useRouterHook } from "@/router/routerHooks";

const mutations = {
  setUpUser: jest.fn(),
  clearUser: jest.fn(),
  setError: jest.fn()
};

const actions = {
  doSignUpUser: jest.fn(),
  doSignInUser: jest.fn(),
  doSignOut: jest.fn()
};

export default {
  namespaced: true,
  mutations,
  actions
};
