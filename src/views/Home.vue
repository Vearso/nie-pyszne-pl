<template>
  <div class="v-home flex justify-between">
    <div class="mx-auto">
      <Header :image="imageHeader"/>
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

export default {
  components: {
    Header,
    Cart,
    ProductsList,
  },
  setup() {
    const imageHeader =
        "https://www.flaticon.com/svg/vstatic/svg/2833/2833438.svg?token=exp=1610639219~hmac=7d495723bb794cebd52742b3afc66cb1";
    return {
      imageHeader,
    }
  }

}
</script>
