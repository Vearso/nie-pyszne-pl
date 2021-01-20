import {ProductsState} from "@/store/interfaces";
import {FoodListItem} from "@/store/navigationInterface";
import {getFoodList} from "@/utilities/apiCalls";

const state: ProductsState = {
    products: [],
    pageNumber: 1,
    numberOfPages: 0,
    numberOfProducts: 9,
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
    setPage(state: ProductsState, page: number) {
        state.pageNumber = 0;
        if (page <= state.numberOfPages && page > 0) {
            state.pageNumber = page;
        } else state.pageNumber = 1;
    },
    setResults(state: ProductsState, list: Array<FoodListItem>) {
        state.products = [];

        const pageNr = state.pageNumber;
        const nrOfProd = state.numberOfProducts;

        for (let i = (pageNr * nrOfProd - nrOfProd); i < (pageNr * nrOfProd); i++) {
            if (list[i] !== undefined) {
                state.products.push(list[i]);
            }
        }
    },
    setNumberOfPages(state: ProductsState, list: Array<FoodListItem>) {
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