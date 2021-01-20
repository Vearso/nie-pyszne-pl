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
    <strong>{{ t("emptyProductList") }}</strong>
  </div>
</template>

<script lang="ts">
import ProductsListItem from "@/components/Products/ProductsListItem.vue";
import { mapMutations } from "vuex";
import { useStore } from "@/store";
import { computed, ref, Ref } from "vue";
import {useI18n} from "vue-i18n";

export default {
  name: "ProductsList",
  components: {
    ProductsListItem
  },
  setup() {
    const store = useStore();
    const {t} = useI18n();

    return {
      items: computed(() => store.state.nav.filteredFoodList),
      displayList: computed(() => store.state.nav.isFoodListAList),
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
