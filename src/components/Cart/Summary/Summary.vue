<template>
  <div class="np-cart__summary">
    <div class="np-cart__summary__price">
      <p>{{ $t('totalPrice') }}</p>
      <p>${{ price.toFixed(2) }}</p>
    </div>

    <button v-if="stepValue < 3"
            :class="[price === 0 ? 'disabled' : 'np-cart__summary__button']"
            @click="nextStep"
            :disabled="price === 0">
      {{ $t('next') }}
    </button>

    <button v-else
            class="np-cart__summary__button"
            @click="resetOrder">
      {{ $t('addOrder') }}
    </button>

    <button v-if="stepValue === 2"
            class="np-cart__summary__button"
            @click="prevStep">
      {{ $t('previous') }}
    </button>
  </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "@/store";

export default {
  setup() {
    const store = useStore();

    const stepValue = computed(() => store.getters['sideMenu/stepValue']);
    const price = computed(() => store.getters['cart/priceTotal'])

    return {
      stepValue,
      price,
      nextStep: () => store.commit('sideMenu/nextStep'),
      prevStep: () => store.commit('sideMenu/prevStep'),
      resetOrder: () => {
        store.commit('sideMenu/resetOrder')
        store.commit('cart/clearCart')
      }
    }
  },
}
</script>

<style scoped lang="scss">
.np-cart__summary {
  @apply w-full px-12 py-6;

  &__price {
    @apply flex justify-between;
  }
  &__button {
    @apply w-full bg-primary font-bold mt-4 p-1;
    color: #fff;
  }
  .disabled {
    @apply w-full bg-secondary-light font-bold mt-4 p-1;
    color: #fff;
  }

}
</style>
