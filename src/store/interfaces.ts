import {MutationTypes} from "@/store/modules/sideMenu/mutation-types";

export interface IRootState {
    root: boolean;
    version: string;
}
export interface MenuStateTypes {
    menuOpened: boolean
}

export interface MenuMutationsTypes<S = MenuStateTypes>{
    [MutationTypes.TOGGLE_MENU](state: S): void;
}