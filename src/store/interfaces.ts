import {FoodListItem, NavState} from "@/store/navigationInterface";

export interface State {
  sideMenu: MenuState;
  cart: CartState;
  nav: NavState;
  form: CartFormState;
  modal: ModalState;
  time: TimeState;
  products: ProductsState;
}

export interface ProductsState {
  products: Array<FoodListItem>
  pageNumber: number;
  numberOfPages: number;
  numberOfProducts: number;
}

export interface TimeObject {
  hours: number,
  minutes: number,
  seconds: number,
}
export interface TimeState {
  time: number,
  calculatedTime: TimeObject,
}

export interface ModalState {
  showModal: boolean,
  itemToDelete: null | CartItem,
}

export interface MenuState {
  menuOpened: boolean;
  step: number;
}

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