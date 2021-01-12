import {MutationTree} from "vuex";
import {MutationTypes} from "@/store/modules/sideMenu/mutation-types";
import {MenuMutationsTypes, MenuStateTypes} from "@/store/interfaces";

export const mutations: MutationTree<MenuStateTypes> &
    MenuMutationsTypes = {
    [MutationTypes.TOGGLE_MENU](state: MenuStateTypes){
        state.menuOpened = !state.menuOpened;
    }
}