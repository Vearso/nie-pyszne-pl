import {
  NavState,
  FoodListItem,
  OrderOption,
  CategoryListItem
} from "../navigationInterface";
import { getFoodList, getFoodCategories } from "@/utilities/apiCalls";

const state: NavState = {
  displayAsList: false,
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
    state.displayAsList = !state.displayAsList;
  },
  setFoodList(state: NavState, list: FoodListItem[]) {
    state.fullFoodList = [...list];
    state.filteredFoodList = [...list];
  },

  orderFoodList(state: NavState) {
    const foodList: FoodListItem[] = [...state.filteredFoodList];

    switch (state.foodListOrder.type) {
      case "alph_asc":
        foodList.sort((prevItem, nextItem) =>
          prevItem.name < nextItem.name ? -1 : 0
        );
        break;
      case "alph_desc":
        foodList.sort((prevItem, nextItem) =>
          prevItem.name > nextItem.name ? -1 : 0
        );
        break;
      case "price_asc":
        foodList.sort((prevItem, nextItem) => prevItem.price - nextItem.price);
        break;
      case "price_desc":
        foodList.sort((prevItem, nextItem) => nextItem.price - prevItem.price);
        break;
    }

    state.filteredFoodList = foodList;
  },
  setFoodListOrder(state: NavState, order: OrderOption) {
    state.foodListOrder = order;
  },
  filterFoodList(state: NavState) {
    const activeCategory: string = state.activeFoodCategory;
    const parameter: string = state.filterFoodParam.toLowerCase();
    const allItems: FoodListItem[] = state.fullFoodList;
    const itemsByCategory: FoodListItem[] =
      activeCategory === "all"
        ? allItems
        : allItems.filter(item => item.foodType === activeCategory);

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
