<template>
  <div class="home">
    <Header :image="imageHeader"
            :title="titleHeader"
            :subtitle="subtitleHeader"/>
    <Navigation/>
    <Products/>
    <Cart/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header/Header.vue";
@Options({
  components: {
    Header
  }
})
export default class Home extends Vue {
  private imageHeader =
      "https://www.flaticon.com/svg/vstatic/svg/2833/2833438.svg?token=exp=1610442341~hmac=78691034b920a1b5599d482745dddbc9"
  private titleHeader =
      "Free delivery today!";
  private subtitleHeader =
      "Lorem ipsum dolor sit amet, consectetur adipiscing";
}
</script>
