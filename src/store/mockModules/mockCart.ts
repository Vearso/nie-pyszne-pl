import { CartItem, CartState } from "@/store/interfaces";

const getters = {
  cartItems(state: CartState): CartItem[] {
    return state.items;
  },
  priceTotal(state: CartState): number {
    return state.priceTotal;
  },
  getPage(state: CartState): CartItem[] {
    return state.paginatedItems[state.currentPage - 1] || [];
  }
};
const mutations = {
  prevPage: jest.fn(),
  nextPage: jest.fn(),
  setPage: jest.fn(),
  calculatePagesCount: jest.fn(),
  setPages: jest.fn(),
  addToCart: jest.fn(),
  calculatePrice: jest.fn(),
  clearCart: jest.fn(),
  decrementQuantity: jest.fn(),
  incrementQuantity: jest.fn(),
  removeFromCart: jest.fn(),
  turnHoverOn: jest.fn(),
  turnHoverOff: jest.fn()
};
const actions = {
  addToCart: jest.fn(),
  removeFromCart: jest.fn()
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true
};
