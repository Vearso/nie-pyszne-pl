import {createStore, Store, useStore as baseUseStore} from "vuex";
import sideMenu from "@/store/modules/sideMenu";
import {InjectionKey} from "vue";
import {MenuState} from "@/store/interfaces";
import cart from "@/store/modules/cart";

export const key: InjectionKey<Store<MenuState>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}


export default createStore({
  modules: { sideMenu, cart }
});
