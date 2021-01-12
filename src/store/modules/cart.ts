//initial state
const state = () => ({
  items: [],
  totalPrice: null,
  quantityTotal: null
});

const getters = {
  cartTotalPrice(state: { quantityTotal: number; }) {
    return state.quantityTotal;
  }
};
const mutations = {
  incrementItemQuantity (state: { quantityTotal: number; }) {
    state.quantityTotal++;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
}