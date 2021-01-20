<template>
  <div class="np-productsDetails">
    <p class="np-productsDetails__quantity text-secondary-light">
      {{ `${item.quantity} x` }}
    </p>

    <span v-if="item.name.length < 20" class="np-productsDetails__name">
      {{ item.name.toUpperCase() }}
    </span>

    <span v-else class="np-productsDetails__name">
      {{ cutName }}
    </span>

    <p class="np-productsDetails__price">{{ $t("currency") + price }}</p>
  </div>
</template>

<script lang="ts">
import { CartItem } from "@/store/interfaces";
import { defineComponent, PropType, computed, ComputedRef } from "vue";

interface Props {
  item: CartItem;
}

export default defineComponent({
  name: "ProductsDetails",

  props: {
    item: {
      type: Object as PropType<CartItem>,
      required: true
    }
  },

  setup(props: Props) {
    const price: ComputedRef<number> = computed(
      () => props.item.price * props.item.quantity
    );
    const cutName: ComputedRef<string> = computed(() =>
      props.item.name
        .substring(0, 20)
        .concat("..")
        .toUpperCase()
    );

    return {
      price,
      cutName
    };
  }
});
</script>

<style scoped lang="scss">
.np-productsDetails {
  @apply flex w-full justify-between items-center;

  &__quantity {
    @apply px-4 truncate w-20;
    @apply sm:text-xs sm:px-2 sm:w-8;
  }

  &__name {
    @apply flex-grow text-left font-bold;
    @apply sm:text-xs;
  }
  &__price {
    @apply sm:text-xs;
  }
}
</style>
