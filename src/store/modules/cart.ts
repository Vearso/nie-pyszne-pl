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
  prevPage(state: CartState): void {
    if (state.currentPage > 1) {
      state.currentPage -= 1;
    }
  },
  nextPage(state: CartState): void {
    if (state.currentPage < state.pagesCount) {
      state.currentPage += 1;
    }
  },
  setPage(state: CartState, page: number): void {
    state.currentPage = page;
  },
  calculatePagesCount(state: CartState): void {
    state.pagesCount = Math.ceil(state.items.length / state.itemsPerPage);
    if (state.currentPage > state.pagesCount) {
      state.currentPage = 1;
    }
  },
  setPages(state: CartState): void {
    state.paginatedItems = [];
    const pageSize: number = state.itemsPerPage;
    const items: CartItem[] = [...state.items];
    for (let i = 0; i < items.length; i += pageSize) {
      const chunk: CartItem[] = items.slice(i, i + pageSize);
      state.paginatedItems.push(chunk);
    }
  },
  addToCart(state: CartState, item: CartItem): void {
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
  calculatePrice(state: CartState): void {
    let priceTotal = 0;
    for (const item of state.items) {
      priceTotal += item.price * item.quantity;
    }
    state.priceTotal = priceTotal;
  },
  clearCart(state: CartState): void {
    state.items = [];
  },
  decrementQuantity(state: CartState, item: CartItem): void {
    const cartItem: CartItem | undefined = state.items.find(
      product => product.id === item.id
    );
    cartItem ? (cartItem.quantity > 1 ? cartItem.quantity-- : null) : null;
  },
  incrementQuantity(state: CartState, item: CartItem): void {
    const cartItem: CartItem | undefined = state.items.find(
      product => product.id === item.id
    );
    cartItem ? cartItem.quantity++ : null;
  },
  removeFromCart(state: CartState, item: CartItem): void {
    state.items = state.items.filter(product => {
      return product.id !== item.id;
    });
  },
  turnHoverOn(state: CartState, item: CartItem): void {
    const cartItem: CartItem | undefined = state.items.find(
      product => product.id === item.id
    );
    cartItem ? (cartItem.isHoveredOn = true) : null;
  },
  turnHoverOff(state: CartState, item: CartItem): void {
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
