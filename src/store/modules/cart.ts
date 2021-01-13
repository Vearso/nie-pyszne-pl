import { CartItem, CartState } from "@/store/interfaces";

const state: CartState = {
  items: []
};

const getters = {
  cartItems(state: CartState): CartItem[] {
    return state.items;
  }
};
const mutations = {
  addToCart(state: CartState, item: CartItem): void {
    const cartItem = state.items.find(product => product.id === item.id);
    cartItem
      ? cartItem.quantity++
      : state.items.push({
          id: item.id,
          name: item.name,
          quantity: 1,
          price: item.price,
          imgUrl: item.imgUrl
        });
    console.log(getters.cartItems(state));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
