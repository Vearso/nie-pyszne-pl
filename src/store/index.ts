import { createStore } from "vuex";
import cart from "@/store/modules/cart";
import nav from "@/store/navigationModule";

export default createStore({
  modules: { cart, nav }
});
