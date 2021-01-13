import { NavStoreModule, NavState } from "./navigationInterface";

const navigationModule: NavStoreModule = {
  state: () => ({
    isProdListAList: false,
    foodList: [],
    activeFoodCategory: "all",
    foodListOrder: "none"
  }),
  mutations: {
    toggleListView(state: NavState){
      state.isProdListAList = !state.isProdListAList
    },
    orderFoodList(state: NavState){
      const foodList = [...state.foodList];
      const orderList = () => {
        switch(state.foodListOrder){
          case "alph_asc":
            foodList.sort((a,b) => {
              return a.name - b.name
            });
            break;
          case "alph_desc":
            foodList.sort((a,b) => {
              return b.name - a.name
            });
            break;
          case "price_asc":
            foodList.sort((a,b) => {
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
      state.foodList = foodList;
    },
    setActiveFoodCategory(state: NavState, newCategory: string){
      state.activeFoodCategory = newCategory;
    }
  },
  actions: {},
  getters: {}
}

export default navigationModule;