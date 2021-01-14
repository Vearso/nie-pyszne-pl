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

