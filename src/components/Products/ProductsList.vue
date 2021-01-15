<template>
  <div
    class="product-list"
    v-if="items.length"
    :style="[
      displayList
        ? 'grid-template-columns: 1fr'
        : 'grid-template-columns: 1fr 1fr 1fr'
    ]"
  >
    <products-list-item
      v-for="item in items"
      :key="item.id"
      :name="item.name"
      :price="item.price"
      :imgUrl="item.imgUrl"
      :rating="item.rating"
      @click="addToCart(item)"
    >
    </products-list-item>
  </div>

  <div v-else class="empty-product-list">
	  <strong>Product list is empty</strong>
  </div>
</template>

<script lang="ts">
import ProductsListItem from "@/components/Products/ProductsListItem.vue";
import { mapMutations } from "vuex";
import { useStore } from "@/store";
import { computed } from "vue";

export default {
  name: "ProductsList",
  components: {
    ProductsListItem
  },
  setup() {
    const store = useStore();
    return {
      items: computed(() => store.state.nav.filteredFoodList),
      displayList: computed(() => store.state.nav.isFoodListAList)
    };
  },
  methods: {
    ...mapMutations("cart", ["addToCart"])
  }
};
</script>

<style lang="scss" scoped>
.product-list {
  display: grid;
  width: 100%;
  margin: 0 auto;
}

.empty-product-list {
  @apply text-primary;
  font-size: 2rem;
}
</style>
