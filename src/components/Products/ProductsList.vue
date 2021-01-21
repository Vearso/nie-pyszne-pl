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
    <strong>{{ t("emptyProductList") }}</strong>
  </div>
  <ListPagination v-if="items.length" />
</template>

<script lang="ts">
import ProductsListItem from "@/components/Products/ProductsListItem.vue";
import { mapMutations } from "vuex";
import { useStore } from "@/store";
import { computed, ref, Ref } from "vue";
import ListPagination from "@/components/Products/ListPagination.vue";
import { useI18n } from "vue-i18n";

export default {
  name: "ProductsList",
  components: {
    ListPagination,
    ProductsListItem
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();

    return {
      items: computed(() => store.state.products.products),
      displayList: computed(() => store.state.nav.displayAsList),
      t
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
