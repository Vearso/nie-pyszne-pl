<template>
  <div class="product-list"
       v-if="items.length"
       :style="[displayList
        ? 'grid-template-columns: 1fr'
        : 'grid-template-columns: 1fr 1fr 1fr']">

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
  <ListPagination v-if="items.length"/>
</template>

<script lang="ts">
import ProductsListItem from "@/components/Products/ProductsListItem.vue";
import { mapMutations } from "vuex";
import { useStore } from "@/store";
import { computed, ref, Ref } from "vue";
import ListPagination from "@/components/Products/ListPagination.vue";

export default {
  name: "ProductsList",
  components: {
    ListPagination,
    ProductsListItem
  },
  setup() {
    const store = useStore();

    return {
      items: computed(() => store.state.products.products),
      displayList: computed(() => store.state.nav.isFoodListAList),
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
