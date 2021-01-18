import {CartItem, ModalState} from "@/store/interfaces";

const state: ModalState = {
    showModal: false,
    itemToDelete: null,
}

const getters = {
    showModal(state: ModalState): boolean {
        return state.showModal;
    },
    productToDelete(state: ModalState): null | CartItem {
        return state.itemToDelete;
    }
}

const mutations = {
    popModal(state: ModalState, item: CartItem): void {
        state.showModal = true;
        state.itemToDelete = item;
    },
    hideModal(state: ModalState): void {
        state.showModal = false;
        state.itemToDelete = null;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}