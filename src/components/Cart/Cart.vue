<template>
  <aside v-if="!isOpened" class="np-cart--closed">
    <UserAvatar class="np-cart__avatar" />

    <div @click="toggleMenu" class="np-cart__arrow__container">
      <RightArrow class="np-cart__arrow" />
    </div>
  </aside>

  <aside v-else class="np-cart--opened">
    <User />
    <Steps />
    <CartProducts v-if="stepValue === 1" />
    <div v-if="stepValue === 2" class="form-container">
      <cart-form />
    </div>
    <Summary v-if="stepValue === 3" />
    <div class="np-cart__arrow__container" @click="toggleMenu">
      <RightArrow class="np-cart__arrow" />
    </div>
  </aside>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from "vue";
import { useStore } from "@/store";
import User from "./User/User.vue";
import Steps from "./Steps/Steps.vue";
import CartProducts from "./CartProducts/CartProducts.vue";
import CartForm from "./CartForm.vue";
import RightArrow from "@/assets/icons/icon-arrow.vue";
import Summary from "@/components/Cart/Summary/Summary.vue";
import UserAvatar from "@/assets/icons/icon-avatar.vue";

export default defineComponent({
  name: "Cart",
  components: {
    User,
    Steps,
    CartProducts,
    CartForm,
    RightArrow,
    Summary,
    UserAvatar
  },

  setup() {
    const store = useStore();

    const isOpened: ComputedRef<boolean> = computed(
      () => store.getters["sideMenu/openedValue"]
    );
    const stepValue: ComputedRef<number> = computed(
      () => store.getters["sideMenu/stepValue"]
    );

    return {
      isOpened,
      stepValue,
      toggleMenu: () => store.commit("sideMenu/toggleMenu")
    };
  }
});
</script>

<style scoped lang="scss">
.np-cart--closed {
  @apply bg-secondary-lighter w-20 flex justify-center h-screen fixed right-0;
  @apply sm:w-screen sm:h-12 sm:items-center sm:justify-between sm:fixed;

  .np-cart__avatar {
    @apply h-12 w-12 rounded-full mt-6;
    @apply sm:p-2 sm:m-0;
  }

  .np-cart__arrow {
    @apply transform rotate-180 left-2.5;
    @apply sm:transform sm:rotate-90 sm:left-1.5;
  }
}

.np-cart--opened {
  @apply bg-secondary-lighter w-1/4 flex flex-col items-center min-h-screen relative right-0 ml-1 text-secondary-dark;
  @apply sm:fixed sm:w-screen sm:items-center;

  .np-cart__arrow__container {
    @apply sm:relative sm:order-first sm:p-2 sm:h-8 sm:w-8 sm:self-end sm:mt-2;
  }
  .np-cart__arrow {
    @apply left-3;
    @apply sm:left-1.5 sm:transform sm:-rotate-90;
  }
}

.np-cart__arrow__container {
  @apply h-12 w-12 rounded-full bg-primary absolute -left-6 flex justify-center items-center cursor-pointer;
  @apply sm:relative sm:h-8 sm:w-8;
}

@media (min-width: 761px) {
  .np-cart__arrow__container {
    top: calc(50vh - 1.5rem);
  }
}

.np-cart__arrow {
  @apply h-6 w-6 absolute fill-current text-white;
  @apply sm:h-5 sm:w-5;
}

.form-container {
  @apply w-full px-8;
}
</style>
