<template>
  <div class="home">
    <Header/>
    <Navigation/>
    <Products/>
    <Cart/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Cart from "@/components/Cart/Cart";
@Options({
  components: {
    Cart
  }
})
export default class Home extends Vue {}
</script>
