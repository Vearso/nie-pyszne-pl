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
}