<template>
  <div class="home flex justify-between">
    <Header/>
    <Navigation/>
    <Products/>
    <Cart/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Cart from "@/components/Cart/Cart.vue";
@Options({
  components: {
    Cart
  }
})
export default class Home extends Vue {}
</script>
