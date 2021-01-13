<template>
  <div class="home flex justify-between">
    <Header :image="imageHeader"/>
    <Navigation />
    <Products />
    <Cart />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header/Header.vue";
import Cart from "@/components/Cart/Cart.vue";
@Options({
  components: {
    Header,
    Cart
  }
})
export default class Home extends Vue {
  private imageHeader =
    "https://www.flaticon.com/svg/vstatic/svg/2833/2833438.svg?token=exp=1610442341~hmac=78691034b920a1b5599d482745dddbc9";
}
</script>
