import {ProductsState} from "@/store/interfaces";
import {FoodListItem} from "@/store/navigationInterface";

const state: ProductsState = {
    products: [],
    pageNumber: 1,
    numberOfPages: 0,
}

const getters = {
    getProducts(state: ProductsState) {
        return state.products;
    },
    getPage(state: ProductsState) {
        return state.pageNumber;
    }
}

const mutations = {
    nextPage(state: ProductsState) {
        if (state.pageNumber < state.numberOfPages) {
            state.pageNumber += 1;
        }
    },
    prevPage(state: ProductsState) {
        if (state.pageNumber > 1) {
            state.pageNumber -= 1
        }
    },
    setResults(state: ProductsState, list: Array<FoodListItem>) {
        for (let i = (state.pageNumber * 9 - 9); i < (state.pageNumber * 9); i++) {
            state.products.push(list[i]);
        }
    },
    getNumberOfPages(state: ProductsState, list: Array<FoodListItem>) {
        if (list.length % 9 !== 0) {
            state.numberOfPages = Math.ceil(list.length / 9);
        } else
            state.numberOfPages = list.length / 9
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}