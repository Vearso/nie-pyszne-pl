export interface MenuState {
  menuOpened: boolean;
  step: number;
}
import { NavState } from "@/store/navigationInterface";

export interface CartState {
  items: Array<CartItem>;
}

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imgUrl: string;
}

export interface State {
  cart: CartState;
  nav: NavState;
  menu: MenuState;
}