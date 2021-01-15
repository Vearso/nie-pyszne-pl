import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";
import { State } from "@/store/interfaces";
import cart from "@/store/modules/cart";
import sideMenu from "@/store/modules/sideMenu";
import form from "@/store/modules/form";


export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

export default createStore({
  modules: { sideMenu, cart, form }
});
