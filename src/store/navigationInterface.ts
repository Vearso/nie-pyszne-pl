export interface FoodListItem {
  id: string;
  name: string;
  foodType: string;
  price: number;
  rating: number;
  imgUrl: string;
}
export type ListOrder =
  | "none"
  | "price_asc"
  | "price_desc"
  | "alph_asc"
  | "alph_desc";

export interface OrderOption {
  category: string;
  order: string;
  type: ListOrder;
}

export interface NavState {
  displayAsList: boolean;
  fullFoodList: Array<FoodListItem>;
  filteredFoodList: Array<FoodListItem>;
  foodListOrder: OrderOption;
  filterFoodParam: string;
  categoryList: Array<CategoryListItem>;
  activeFoodCategory: string;
}

export interface CategoryListItem {
  readonly id: string;
  readonly name: string;
  readonly categoryType: string;
  readonly iconUrl: any;
}

export interface NavStoreModule {
  state: NavState;
  mutations: {};
  actions: {};
  getters: {};
  namespaced: boolean;
}
