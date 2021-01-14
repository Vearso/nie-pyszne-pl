export interface FoodListItem {
  id: string;
  name: string;
  foodType: string;
  price: number;
  rating: number;
  imgUrl: string;
}

export interface NavState {
  isFoodListAList: boolean;
  fullFoodList: Array<FoodListItem>;
  filteredFoodList: Array<FoodListItem>;
  foodListOrder: "none" | "price_asc" | "price_desc" | "alph_asc" | "alph_desc";
  filterFoodParam: string;
  categoryList: Array<CategoryListItem>;
  activeFoodCategory: string;
}


export interface CategoryListItem {
  readonly id: string;
  readonly name: string;
  readonly categoryType: string;
  readonly iconUrl: string;
}

export interface NavStoreModule {
  state: () => NavState;
  mutations: {};
  actions: {};
  getters: {};
}