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
  prevPage(state: CartState) {
    jest.fn();
  },
  nextPage(state: CartState) {
    jest.fn();
  },
  setPage(state: CartState, page: number) {
    jest.fn();
  },
  calculatePagesCount(state: CartState) {
    jest.fn();
  },
  setPages(state: CartState) {
    jest.fn();
  },
  addToCart(state: CartState, item: CartItem) {
    jest.fn();
  },
  calculatePrice(state: CartState) {
    jest.fn();
  },
  clearCart(state: CartState) {
    jest.fn();
  },
  decrementQuantity(state: CartState, item: CartItem) {
    jest.fn();
  },
  incrementQuantity(state: CartState, item: CartItem) {
    jest.fn();
  },
  removeFromCart(state: CartState, item: CartItem) {
    jest.fn();
  },
  turnHoverOn(state: CartState, item: CartItem) {
    jest.fn();
  },
  turnHoverOff(state: CartState, item: CartItem) {
    jest.fn();
  }
};
const actions = {
  addToCart(context: any, item: CartItem) {
    jest.fn();
  },
  removeFromCart(context: any, item: CartItem) {
    jest.fn();
  }
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true
};
