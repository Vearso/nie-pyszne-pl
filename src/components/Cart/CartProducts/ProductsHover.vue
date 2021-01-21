<template>
  <div class="np-productsHover">
    <div class="np-productsHover__actions">
      <span
        :class="{ 'text-secondary-light': item.quantity === 1 }"
        @click="decrement(item)"
        class="np-productsHover__actions__action"
      >
        -
      </span>

      <p class=" np-productsHover__actions__quantity text-secondary-dark">
        {{ item.quantity }}
      </p>

      <span @click="increment(item)" class="np-productsHover__actions__action">
        +
      </span>
    </div>

    <IconCross @click="showModal(item)" class="np-productsHover__cross" />
  </div>
</template>

<script lang="ts">
import { CartItem } from "@/store/interfaces";
import { defineComponent, PropType, watch } from "vue";
import { useStore } from "@/store";
import IconCross from "@/assets/icons/icon-cross.vue";

export default defineComponent({
  name: "ProductsHover",

  components: {
    IconCross
  },

  props: {
    item: {
      type: Object as PropType<CartItem>
    }
  },

  setup() {
    const store = useStore();
    const updatePrice = () => {
      store.commit("cart/calculatePrice");
    };
    watch(store.state.cart.items, updatePrice);
    return {
      showModal: (item: CartItem) => store.commit("modal/popModal", item),
      increment: (item: CartItem) =>
        store.commit("cart/incrementQuantity", item),
      decrement: (item: CartItem) =>
        store.commit("cart/decrementQuantity", item)
    };
  }
});
</script>

<style scoped lang="scss">
.np-productsHover {
  @apply flex w-full items-center;

  &__actions {
    @apply flex flex-grow;
    @apply sm:text-base;

    &__action {
      @apply px-4 cursor-pointer;
    }
  }

  &__cross {
    @apply mr-6 w-6 h-6 cursor-pointer;
  }
}
</style>
