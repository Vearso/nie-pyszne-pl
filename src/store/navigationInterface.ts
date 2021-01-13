export interface FoodListItem {
  id: string,
  name: string,
  foodType: string,
  price: number,
  rating: number,
  imgUrl: string
}

export interface NavState {
  isFoodListAList: boolean,
  foodList: Array<FoodListItem>,
  foodListOrder: "none" | "price_asc" | "price_desc" | "alph_asc" | "alph_desc",
  activeFoodCategory: string
}


export interface CategoryListItem {
  id: string,
  name: string,
  categoryType: string,
  iconUrl: string
}

export interface NavStoreModule {
  state: () => NavState,
  mutations: {},
  actions: {},
  getters: {}
}