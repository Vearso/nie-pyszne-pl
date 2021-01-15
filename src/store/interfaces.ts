export interface State {
  sideMenu: MenuState;
  cart: CartState;
  form: CartFormState;
}
export interface MenuState {
  menuOpened: boolean;
  step: number;
}
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

export interface CartFormState {
  fullName: string;
  mail: string;
  phone: number;
  city: string;
  street: string;
  postCode: string;
  isValid: boolean;
}