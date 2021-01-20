import {
  NavState,
  FoodListItem,
  OrderOption,
  CategoryListItem
} from "../navigationInterface";
import { getFoodList, getFoodCategories } from "@/utilities/apiCalls";

const state: NavState = {
  isFoodListAList: false,
  fullFoodList: [],
  filteredFoodList: [],
  filterFoodParam: "",
  foodListOrder: {
    category: "Option",
    order: "details",
    type: "none"
  },
  categoryList: [],
  activeFoodCategory: "all"
};

const mutations = {
  toggleFoodListView(state: NavState) {
    state.isFoodListAList = !state.isFoodListAList;
  },
  setFoodList(state: NavState, list: FoodListItem[]) {
    state.fullFoodList = list;
    state.filteredFoodList = [...state.fullFoodList];
  },

  orderFoodList(state: NavState) {
    const foodList = [...state.filteredFoodList];
    const orderList = () => {
      switch (state.foodListOrder.type) {
        case "alph_asc":
          foodList.sort((a: FoodListItem, b: FoodListItem) => {
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
          break;
        case "alph_desc":
          foodList.sort((a: FoodListItem, b: FoodListItem) => {
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
          break;
        case "price_asc":
          foodList.sort((a: FoodListItem, b: FoodListItem) => {
            return a.price - b.price;
          });
          break;
        case "price_desc":
          foodList.sort((a: FoodListItem, b: FoodListItem) => {
            return b.price - a.price;
          });
          break;
      }
    };
    orderList();
    state.filteredFoodList = foodList;
  },
  setFoodListOrder(state: NavState, order: OrderOption) {
    state.foodListOrder = order;
  },
  filterFoodList(state: NavState, param: string) {
    const parameter = param.trim().toLowerCase();
    const list = [...state.filteredFoodList];

    const filteredList = list.filter(result => {
      if (
        result.name.toLowerCase().includes(parameter) ||
        result.price.toString() === parameter ||
        result.rating.toString() === parameter
      ) {
        return result;
      }
    });

    state.filteredFoodList = filteredList;
  },
  setFoodListFilter(state: NavState, filter: string) {
    state.filterFoodParam = filter;
  },

  setActiveFoodCategory(state: NavState, newCategory: string) {
    state.activeFoodCategory = newCategory;
  },

  filterFoodByCategory(state: NavState) {
    if (state.activeFoodCategory === "all") {
      state.filteredFoodList = state.fullFoodList;
    } else {
      const list = [...state.fullFoodList];
      const filteredList = list.filter(foodItem => {
        if (state.activeFoodCategory === foodItem.foodType) {
          return foodItem;
        }
      });
      state.filteredFoodList = filteredList;
    }
  },

  setFoodCategories(state: NavState, list: Array<CategoryListItem>) {
    console.log(list);
    state.categoryList = list;
  }
};

const actions = {
  async fetchFoodList(context: any) {
    const searchedCategory = context.state.activeFoodCategory;
    const list: FoodListItem[] = await getFoodList();

    context.commit("setFoodList", list);
  },

  async fetchMenuCategories(context: any) {
    const categoryList: Array<CategoryListItem> = await getFoodCategories();

    context.commit("setFoodCategories", categoryList);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
