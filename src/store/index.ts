import {createStore, Store, useStore as baseUseStore} from "vuex";
import cart from "@/store/modules/cart";
import nav from "@/store/modules/navigation";
import {InjectionKey} from "vue";
import { CartState, State } from "@/store/interfaces";

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}

export default createStore({
  modules: { cart, nav }
});