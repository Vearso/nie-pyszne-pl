import {createStore, Store, useStore as baseUseStore} from "vuex";
import cart from "@/store/modules/cart";
import {InjectionKey} from "vue";
import {CartState} from "@/store/interfaces";

export const key: InjectionKey<Store<CartState>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}

export default createStore({
  modules: { cart }
});
