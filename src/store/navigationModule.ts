import { NavStoreModule, NavState, FoodListItem } from "./navigationInterface";
import { getFoodList } from "../utilities/apiCalls";

const navigationModule: NavStoreModule = {
  state: () => ({
    isFoodListAList: false,
    fullFoodList: [],
    filteredFoodList: [],
    filterFoodParam: "",
    foodListOrder: "none",
    categoryList: [],
    activeFoodCategory: "all",
  }),
  mutations: {
    toggleListView(state: NavState){
      state.isFoodListAList = !state.isFoodListAList
    },
    setFoodList(state: NavState, list: FoodListItem[]){
      state.fullFoodList = list;
      state.filteredFoodList = state.fullFoodList;
    },
    orderFoodList(state: NavState){
      const foodList = [...state.filteredFoodList];
      const orderList = () => {
        switch(state.foodListOrder){
          case "alph_asc":
            foodList.sort((a:any,b:any) => {
              return a.name - b.name
            });
            break;
          case "alph_desc":
            foodList.sort((a:any,b:any) => {
              return b.name - a.name
            });
            break;
          case "price_asc":
            foodList.sort((a:FoodListItem,b:FoodListItem) => {
              return a.price - b.price
            });
            break;
          case "price_desc":
            foodList.sort((a,b) => {
              return b.price - a.price
            });
            break;
        }
      }
      orderList();
      state.filteredFoodList = foodList;
    },
    filterFoodList(state: NavState, param:string){
      const parameter = param.trim().toLowerCase();

      const filteredList = [...state.fullFoodList];
      filteredList.filter(result => {
        if(
          result.name.includes(parameter) || result.price.toString() === parameter || result.rating.toString() === parameter
        ){
          return result
        }
      });
      state.filteredFoodList = filteredList;
    },
    setFoodListFilter(state: NavState, filter: string){
      state.filterFoodParam = filter;
    },
    setActiveFoodCategory(state: NavState, newCategory: string){
      state.activeFoodCategory = newCategory;
    }
  },
  actions: {
    async fetchFoodList(context: any){
      const searchedCategory = context.state.activeFoodCategory;
      const list: FoodListItem[] = await getFoodList(searchedCategory);

      context.commit('setFoodList', list);
    }
  },
  getters: {}
}

export default navigationModule;