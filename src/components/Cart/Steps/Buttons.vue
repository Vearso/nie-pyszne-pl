<template>
  <div class="np-cart__buttons">
    <button
      :class="{ 'np-cart__buttons__button--disabled': !isChecked }"
      :disabled="!isChecked"
      @click="nextStep"
      v-if="stepValue < 3"
      class="np-cart__buttons__button"
    >
      {{ t("next") }}
    </button>

    <button v-else class="np-cart__buttons__button" @click="resetOrder">
      {{ t("addOrder") }}
    </button>

    <button
      @click="prevStep"
      v-if="stepValue === 2"
      class="np-cart__buttons__button"
    >
      {{ t("previous") }}
    </button>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, Ref, ref } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";

interface ButtonsPropTypes {
  isFormValid: boolean;
}

export default {
  props: {
    isFormValid: Boolean
  },
  setup(props: ButtonsPropTypes) {
    const store = useStore();
    const { t } = useI18n();
    const formValid: ComputedRef<boolean> = computed(() => props.isFormValid);
    const stepValue: ComputedRef<number> = computed(
      () => store.getters["sideMenu/stepValue"]
    );
    const price: ComputedRef<number> = computed(
      () => store.getters["cart/priceTotal"]
    );

    const isChecked: ComputedRef<boolean> = computed(
      () =>
        (formValid.value && stepValue.value === 2) ||
        (price.value !== 0 && stepValue.value === 1)
    );

    return {
      t,
      stepValue,
      price,
      isChecked,
      nextStep: () => store.commit("sideMenu/nextStep"),
      prevStep: () => store.commit("sideMenu/prevStep"),
      resetOrder: () => {
        store.commit("sideMenu/resetOrder");
        store.commit("cart/clearCart");
      }
    };
  }
};
</script>

<style scoped lang="scss">
.np-cart__buttons {
  @apply w-full px-12;

  &__button {
    @apply w-full bg-primary font-bold mt-4 p-1 text-secondary-lighter;

    &--disabled {
      @apply w-full bg-secondary-light cursor-default;
    }
  }
}
</style>
