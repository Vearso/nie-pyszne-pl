import {CartItem, CartState} from "@/store/interfaces";

const state: CartState = {
    items: []
};

const getters = {
    cartItems(state: CartState): CartItem[] {
        return state.items;
    }
};
const mutations = {
    addToCart: function (state: CartState, item: CartItem): void {
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
                imgUrl: item.imgUrl
            });
    },
    decrementQuantity: function (state: CartState, item: CartItem): void {
        const cartItem: CartItem | undefined = state.items.find(
            product => product.id === item.id
        );
        cartItem
            ? cartItem.quantity > 1
            ? cartItem.quantity--
            : null
            : null
    },
    incrementQuantity: function (state: CartState, item: CartItem): void {
        const cartItem: CartItem | undefined = state.items.find(
            product => product.id === item.id
        );
        cartItem
            ? cartItem.quantity++
            : null
    },
    removeFromCart: function (state: CartState, item: CartItem): void {
        state.items = state.items.filter(
            product => {
                return (product.id !== item.id)
            }
        );
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
};
