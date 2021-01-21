<template>
  <div
    class="product-list grid-cols-1"
    v-if="items.length"
    :class="[displayList ? 'md:grid-cols-1' : 'md:grid-cols-3']"
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
    <strong>{{ $t("emptyProductList") }}</strong>
  </div>
  <ListPagination />
</template>

<script lang="ts">
import ProductsListItem from "@/components/Products/ProductsListItem.vue";
import { useStore } from "@/store";
import { computed } from "vue";
import ListPagination from "@/components/Products/ListPagination.vue";
import { CartItem } from "@/store/interfaces";

export default {
  name: "ProductsList",
  components: {
    ListPagination,
    ProductsListItem
  },
  setup() {
    const store = useStore();

    const addToCart = (item: CartItem) => {
      store.dispatch("cart/addToCart", item);
    };

    return {
      addToCart,
      items: computed(() => store.state.products.products),
      displayList: computed(() => store.state.nav.displayAsList)
    };
  }
};
</script>

<style lang="scss" scoped>
.product-list {
  @apply grid w-full;
}

.empty-product-list {
  @apply text-primary text-4xl;
}
</style>
