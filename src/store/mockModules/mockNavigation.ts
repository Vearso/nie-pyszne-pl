const mutations = {
  toggleFoodListView: jest.fn(),
  setFoodList: jest.fn(),

  orderFoodList: jest.fn(),
  setFoodListOrder: jest.fn(),
  filterFoodList: jest.fn(),
  setFoodListFilter: jest.fn(),
  setActiveFoodCategory: jest.fn(),
  setFoodCategories: jest.fn()
};

const actions = {
  fetchFoodList: jest.fn(),
  fetchMenuCategories: jest.fn()
};

export default {
  namespaced: true,
  mutations,
  actions
};
