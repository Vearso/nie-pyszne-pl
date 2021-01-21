import { CartItem, CartState } from "@/store/interfaces";

const state: CartState = {
  items: [],
  currentPage: 1,
  pagesCount: 0,
  itemsPerPage: 3,
  paginatedItems: [],
  priceTotal: 0
};

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
  prevPage: function(state: CartState): void {
    state.currentPage > 1 ? state.currentPage-- : null;
  },
  nextPage: function(state: CartState): void {
    state.currentPage < state.pagesCount ? state.currentPage++ : null;
  },
  setPage: function(state: CartState, page: number): void {
    state.currentPage = page;
  },
  calculatePagesCount: function(state: CartState) {
    state.pagesCount = Math.ceil(state.items.length / state.itemsPerPage);
  },
  setPages: function(state: CartState) {
    state.paginatedItems = [];
    const pageSize: number = state.itemsPerPage;
    const items: CartItem[] = [...state.items];
    for (let i = 0; i < items.length; i += pageSize) {
      const chunk: CartItem[] = items.slice(i, i + pageSize);
      state.paginatedItems.push(chunk);
    }
  },
  addToCart: function(state: CartState, item: CartItem): void {
    const cartItem: CartItem | undefined = state.items.find(
      product => product.id === item.id
    );
    cartItem
      ? cartItem.quantity++
      : state.items.push({
          id: item.id,
          name: item.name,
          quantity: 1,
          price: item.price,
          imgUrl: item.imgUrl,
          isHoveredOn: false
        });
  },
  calculatePrice: function(state: CartState): void {
    let priceTotal = 0;
    for (const item of state.items) {
      priceTotal += item.price * item.quantity;
    }
    state.priceTotal = priceTotal;
  },
  clearCart: function(state: CartState): void {
    state.items = [];
  },
  decrementQuantity: function(state: CartState, item: CartItem): void {
    const cartItem: CartItem | undefined = state.items.find(
      product => product.id === item.id
    );
    cartItem ? (cartItem.quantity > 1 ? cartItem.quantity-- : null) : null;
  },
  incrementQuantity: function(state: CartState, item: CartItem): void {
    const cartItem: CartItem | undefined = state.items.find(
      product => product.id === item.id
    );
    cartItem ? cartItem.quantity++ : null;
  },
  removeFromCart: function(state: CartState, item: CartItem): void {
    state.items = state.items.filter(product => {
      return product.id !== item.id;
    });
  },
  turnHoverOn: function(state: CartState, item: CartItem): void {
    const cartItem: CartItem | undefined = state.items.find(
      product => product.id === item.id
    );
    cartItem ? (cartItem.isHoveredOn = true) : null;
  },
  turnHoverOff: function(state: CartState, item: CartItem): void {
    const cartItem: CartItem | undefined = state.items.find(
      product => product.id === item.id
    );
    cartItem ? (cartItem.isHoveredOn = false) : null;
  }
};

const actions = {
  addToCart(context: any, item: CartItem) {
    context.commit("addToCart", item);
    context.commit("calculatePrice");
    context.commit("calculatePagesCount");
    context.commit("setPages");
  },
  removeFromCart(context: any, item: CartItem) {
    context.commit("removeFromCart", item);
    context.commit("calculatePrice");
    context.commit("calculatePagesCount");
    context.commit("setPages");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
