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
import Navigation from '../components/Navigation/Navigation.vue';

@Options({
  components: {
    Navigation
  }
})
export default class Home extends Vue {}
</script>
