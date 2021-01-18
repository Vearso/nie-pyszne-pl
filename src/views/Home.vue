<template>
  <div class="v-home flex justify-between">
    <div class="mx-auto w-1/2">
      <Header/>
      <Navigation/>
      <ProductsList/>
    </div>
    <Cart/>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header/Header.vue";
import Cart from "@/components/Cart/Cart.vue";
import ProductsList from "@/components/Products/ProductsList.vue";
import Navigation from "@/components/Navigation/Navigation.vue";
import { onMounted } from "vue";
import { useStore } from "@/store";
import router from "@/router";
import { UrlParameters } from "@/utilities/urlHandler";
import orderOptions from "@/components/Navigation/SearchBar/orderOptions";


export default {
  components: {
    Navigation,
    Header,
    Cart,
    ProductsList
  },
  setup() {
    const store = useStore();

    onMounted(async() => {
      await store.dispatch("nav/fetchFoodList");
      const params: Partial<UrlParameters> = {
        ...router.currentRoute.value.query
      };

      if(params.foodCategory){
        store.commit("nav/setActiveFoodCategory", params.foodCategory);
        store.commit("nav/filterFoodByCategory");
      }
      if(params.filterPhrase){
        store.commit("nav/filterFoodByCategory");
        store.commit("nav/filterFoodList", params.filterPhrase);
      }
      if(params.listOrder){
        const option = orderOptions.find(option => option.type === params.listOrder);
        store.commit("nav/setFoodListOrder", option);
        store.commit("nav/orderFoodList");
      }
      store.commit("nav/setFoodList", store.state.nav.filteredFoodList);
    });
  }
}
</script>