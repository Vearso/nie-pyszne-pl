<template>
  <div class="home">
    <!-- <Header/>
    <Cart/>
    <Navigation/> -->
    <products-list/>
    
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProductsList from "../components/Products/ProductsList.vue";

@Options({
  components: {
    ProductsList
  }
})
export default class Home extends Vue {}
</script>
