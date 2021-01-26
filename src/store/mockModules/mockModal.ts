import { CartItem, ModalState } from "@/store/interfaces";

const getters = {
  showModal(state: ModalState): boolean {
    return state.showModal;
  },
  productToDelete(state: ModalState): null | CartItem {
    return state.itemToDelete;
  }
};

const mutations = {
  popModal: jest.fn(),
  hideModal: jest.fn()
};

export default {
  namespaced: true,
  getters,
  mutations
};
