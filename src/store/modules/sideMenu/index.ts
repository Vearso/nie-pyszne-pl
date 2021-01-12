import {Module} from "vuex";
import {MenuStateTypes, IRootState} from "@/store/interfaces";
import {state} from "@/store/modules/sideMenu/state";
import {mutations} from "@/store/modules/sideMenu/mutations";

const menu: Module<MenuStateTypes,IRootState> = {
    state,
    mutations,
}

export default menu;