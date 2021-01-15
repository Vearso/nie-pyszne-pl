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
import Navigation from '@/components/Navigation/Navigation.vue';
import { onMounted } from 'vue';
import { useStore } from "@/store";


export default {
  components: {
    Navigation,
    Header,
    Cart,
    ProductsList,
  },
  setup() {
    const store = useStore();

    const getFoodList = function () {
      store.dispatch("nav/fetchFoodList");
    }
    onMounted(() => {
      getFoodList()
    })
    return {
      getFoodList
    }
  }
}
</script>