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
