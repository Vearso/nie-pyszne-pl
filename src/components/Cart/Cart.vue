<template>
  <aside v-if="!isOpened"
         class="np-cart--closed">

    <img :src="userAvatar"
         alt="avatar"
         class="np-cart__avatar"/>

    <div @click="toggleMenu"
         class="np-cart__arrow__container">

      <RightArrow class="np-cart__arrow"/>
    </div>
  </aside>

  <aside v-else class="np-cart--opened">
    <User/>
    <Steps/>
    <CartProducts v-if="stepValue === 1"/>
    <div v-if="stepValue === 2"
         class="form-container">
      <cart-form/>
    </div>

    <div class="np-cart__arrow__container" @click="toggleMenu">
      <RightArrow class="np-cart__arrow"/>
    </div>
  </aside>
</template>

<script lang="ts">
import {computed, ComputedRef} from "vue";
import {useStore} from "@/store";
import User from "./User/User.vue";
import Steps from "./Steps/Steps.vue";
import CartProducts from "./CartProducts.vue";
import CartForm from "./CartForm.vue";
import RightArrow from "@/assets/icons/icon-arrow.vue"

export default {
  components: {
    User,
    Steps,
    CartProducts,
    CartForm,
    RightArrow
  },
  props: {
    userAvatar: {
      type: String,
      default:
          "https://www.flaticon.com/svg/vstatic/svg/709/709722.svg?token=exp=1610530566~hmac=696747298203e1fd530d44bf33b36319"
    }
  },
  setup(props: object) {
    const store = useStore();

    const isOpened: ComputedRef<boolean> = computed(() => store.getters["sideMenu/openedValue"]);
    const stepValue: ComputedRef<number> = computed(() => store.getters["sideMenu/stepValue"]);
    return {
      isOpened,
      stepValue,
      toggleMenu: () => store.commit("sideMenu/toggleMenu")
    };
  }
};
</script>

<style scoped lang="scss">
.np-cart--closed {
  @apply bg-secondary-lighter w-20 h-screen flex justify-center relative;
  @apply sm:absolute sm:top-0 sm:h-12 sm:w-screen sm:justify-between sm:items-center sm:p-2;

  .np-cart__avatar {
    @apply h-12 w-12 rounded-full mt-6;
    @apply sm:h-6 sm:w-6 sm:m-2;
  }

  .np-cart__arrow {
    @apply transform rotate-180;
    @apply sm:transform sm:rotate-90;
  }
}

.np-cart--opened {
  @apply bg-secondary-lighter w-1/4 h-screen flex flex-col items-center relative text-secondary-dark;
  @apply sm:h-1/2 sm:absolute sm:top-0 sm:h-screen sm:w-screen ;
  .np-cart__arrow {
    @apply sm:transform sm:-rotate-90;
  }
  .np-cart__arrow__container {
    @apply sm:order-first sm:self-end sm:mt-3 sm:mr-2;
  }
}

.np-cart__arrow__container {
  @apply h-12 w-12 rounded-full bg-primary absolute -left-6 flex justify-center items-center cursor-pointer;
  @apply sm:w-6 sm:h-6 sm:relative sm:left-0;
  @media (min-width: 761px) {
    top: calc(50% - 1.5rem);
  }

  .np-cart__arrow {
    @apply h-8 w-8 absolute left-1.5;
    @apply sm:h-4 sm:w-4 sm:left-1;
    fill: white;
  }
}


.form-container {
  @apply w-full px-8;
}
</style>
