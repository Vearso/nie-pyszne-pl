export interface State {
  sideMenu: MenuState;
  cart: CartState;
  nav: NavState;
  form: CartFormState;
}
export interface MenuState {
  menuOpened: boolean;
  step: number;
}
import { NavState } from "@/store/navigationInterface";

export interface CartState {
  items: Array<CartItem>;
  priceTotal: number,
}

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imgUrl: string;
  isHoveredOn: boolean,
}

export interface CartFormState {
  fullName: string;
  mail: string;
  phone: number;
  city: string;
  street: string;
  postCode: string;
  isValid: boolean;
}