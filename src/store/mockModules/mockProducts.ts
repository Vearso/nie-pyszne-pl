import { ProductsState } from "@/store/interfaces";

const getters = {
  getProducts(state: ProductsState) {
    return state.products;
  },
  getPage(state: ProductsState) {
    return state.pageNumber;
  }
};

const mutations = {
  nextPage: jest.fn(),
  prevPage: jest.fn(),
  setPage: jest.fn(),
  setResults: jest.fn(),
  setNumberOfPages: jest.fn()
};

export default {
  namespaced: true,
  getters,
  mutations
};
