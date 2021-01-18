import {CartItem, CartState} from "@/store/interfaces";

const state: CartState = {
    items: [],
    priceTotal: 0,
};

const getters = {
    cartItems(state: CartState): CartItem[] {
        return state.items;
    },
    priceTotal(state: CartState) :number {
        let priceTotal = 0;
        for (const item of state.items) {
            priceTotal += (item.price * item.quantity);
        }
        return state.priceTotal = priceTotal;
    },
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
                imgUrl: item.imgUrl,
                isHoveredOn: false
            });
    },
    clearCart: function (state: CartState): void {
        state.items = [];
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
    },
    turnHoverOn: function (state: CartState, item: CartItem): void {
        const cartItem: CartItem | undefined = state.items.find(
            product => product.id === item.id
        );
        cartItem ? cartItem.isHoveredOn = true : null
    },
    turnHoverOff: function (state: CartState, item: CartItem): void {
        const cartItem: CartItem | undefined = state.items.find(
            product => product.id === item.id
        );
        cartItem ? cartItem.isHoveredOn = false : null
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
};
