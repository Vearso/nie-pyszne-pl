import {
  CategoryListItem,
  FoodListItem,
  NavState,
  OrderOption
} from "../navigationInterface";
import { getFoodCategories, getFoodList } from "@/utilities/apiCalls";

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
  filterFoodList(state: NavState) {
    const activeCategory: string = state.activeFoodCategory;
    const parameter: string = state.filterFoodParam;
    const allItems: FoodListItem[] = state.fullFoodList;
    let itemsByCategory: FoodListItem[];

    activeCategory === "all"
      ? (itemsByCategory = allItems)
      : (itemsByCategory = allItems.filter(
          item => item.foodType === activeCategory
        ));

    state.filteredFoodList = parameter.length
      ? itemsByCategory.filter(
        item =>
          item.name.toLowerCase().includes(parameter) ||
          item.price.toString() === parameter ||
          item.rating.toString() === parameter
      )
      : itemsByCategory;
  },
  setFoodListFilter(state: NavState, filter: string) {
    state.filterFoodParam = filter;
  },

  setActiveFoodCategory(state: NavState, newCategory: string) {
    state.activeFoodCategory = newCategory;
  },

  setFoodCategories(state: NavState, list: Array<CategoryListItem>) {
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
