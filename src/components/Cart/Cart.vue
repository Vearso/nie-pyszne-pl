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
    <Summary v-if="stepValue === 3"/>
    <div class="np-cart__arrow__container" @click="toggleMenu">
      <RightArrow class="np-cart__arrow"/>
    </div>
  </aside>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent} from "vue";
import {useStore} from "@/store";
import User from "./User/User.vue";
import Steps from "./Steps/Steps.vue";
import CartProducts from "./CartProducts/CartProducts.vue";
import CartForm from "./CartForm.vue";
import RightArrow from "@/assets/icons/icon-arrow.vue"
import Summary from "@/components/Cart/Summary/Summary.vue";
export default defineComponent({
  name: "Cart",
  components: {
    User,
    Steps,
    CartProducts,
    CartForm,
    RightArrow,
    Summary,
  },
  props: {
    userAvatar: {
      type: String,
      default:
          "https://www.flaticon.com/svg/vstatic/svg/709/709722.svg?token=exp=1610530566~hmac=696747298203e1fd530d44bf33b36319"
    }
  },
  setup() {
    const store = useStore();

    const isOpened: ComputedRef<boolean> = computed(() => store.getters["sideMenu/openedValue"]);
    const stepValue: ComputedRef<number> = computed(() => store.getters["sideMenu/stepValue"]);
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
  @apply bg-secondary-lighter w-20 flex justify-center min-h-full fixed right-0;

  .np-cart__avatar {
    @apply h-12 w-12 rounded-full mt-6;
  }

  .np-cart__arrow {
    @apply transform rotate-180 left-2.5;
  }
}

.np-cart--opened {
  @apply bg-secondary-lighter w-1/4 flex flex-col items-center min-h-screen relative right-0 ml-1 text-secondary-dark;
  .np-cart__arrow {
    @apply left-3;
  }
}

.np-cart__arrow__container {
  @apply h-12 w-12 rounded-full bg-primary absolute -left-6 flex justify-center items-center cursor-pointer;
  top: calc(50vh - 1.5rem);

  .np-cart__arrow {
    @apply h-6 w-6 absolute fill-current text-white;
  }
}


.form-container {
  @apply w-full px-8;
}
</style>
