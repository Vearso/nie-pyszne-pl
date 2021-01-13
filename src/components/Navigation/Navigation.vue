<template>
    <nav>
        <FoodCategories :categories="categoryList"/>
        <SearchBar />
    </nav>
</template>

<script lang="ts">

import FoodCategories from './FoodCategories/FoodCategories.vue';
import SearchBar from "./SearchBar/SearchBar.vue";

export default {
  name: "Navigation",
  data(){
    return {
      categoryList: [
        {
          name: "Pizza",
          type: "pizza",
          src: "@/assets/icons/restaurant.svg"
        },
        {
          name: "Sushi",
          type: "sushi",
          src: "https://google.com"
        }
      ]
    }
  },
  components: {
    FoodCategories,
    SearchBar
  }

}
</script>

<style scoped>

</style>