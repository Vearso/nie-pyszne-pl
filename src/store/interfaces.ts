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

