<template>
  <div class="product-list grid-cols-1"
       v-if="items.length"
       :class="[displayList ? 'md:grid-cols-1' : 'md:grid-cols-3']">

    <products-list-item v-for="item in items"
                        :key="item.id"
                        :name="item.name"
                        :price="item.price"
                        :imgUrl="item.imgUrl"
                        :rating="item.rating"
                        @click="addToCart(item)">
    </products-list-item>
  </div>

  <div v-else class="empty-product-list">
    <strong>{{ $t("emptyProductList") }}</strong>
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
      displayList: computed(() => store.state.nav.displayAsList)
    };
  },
  methods: {
    ...mapMutations("cart", ["addToCart"])
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
