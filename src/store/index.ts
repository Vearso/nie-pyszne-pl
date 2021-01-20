import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";
import { State, CartState } from "@/store/interfaces";
import cart from "@/store/modules/cart";
import sideMenu from "@/store/modules/sideMenu";
import form from "@/store/modules/form";
import nav from "@/store/modules/navigation";
import modal from "@/store/modules/modal";
import time from "@/store/modules/time";
import products from "@/store/modules/products";


export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

export default createStore({
  modules: { sideMenu, cart, form, nav, modal, time, products}
});
