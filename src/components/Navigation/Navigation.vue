<template>
  <nav>
    <FoodCategories />
    <SearchBar />
  </nav>
</template>

<script lang="ts">
import FoodCategories from "./FoodCategories/FoodCategories.vue";
import SearchBar from "./SearchBar/SearchBar.vue";

export default {
  name: "Navigation",
  components: {
    FoodCategories,
    SearchBar
  }
};
</script>

<style scoped></style>
