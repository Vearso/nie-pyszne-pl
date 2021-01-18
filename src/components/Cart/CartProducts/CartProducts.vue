<template>
  <div v-for="item in cart"
       :key="item.id"
       class="np-cartProducts__item"
       @mouseover="turnHoverOn(item)"
       @mouseleave="turnHoverOff(item)">

    <img :src="item.imgUrl"
         alt="Food"
         class="np-cartProducts__item__image"/>

    <ProductsDetails v-if="!item.isHoveredOn" :item="item"/>
    <ProductsHover v-else :item="item"/>
  </div>

  <div class="np-cartProducts__item__price">
    <p>{{ $t('totalPrice') }}</p>
    <p>${{ priceTotal.toFixed(2) }}</p>
  </div>

  <Summary/>

  <Modal v-if="showModal"/>
</template>

<script lang="ts">
import {useStore} from "@/store";
import {computed, defineComponent, ComputedRef} from "vue";
import Summary from "@/components/Cart/Summary/Buttons.vue";
import {CartItem, CartState} from "@/store/interfaces";
import ProductsDetails from "@/components/Cart/CartProducts/ProductsDetails.vue";
import ProductsHover from "@/components/Cart/CartProducts/ProductsHover.vue";
import Modal from "@/components/Cart/CartProducts/Modal.vue";

export default defineComponent({

  name: "cartProducts",

  components: {
    ProductsDetails,
    ProductsHover,
    Modal,
    Summary,
  },

  setup() {
    const store = useStore();

    const cart = computed(() => store.getters['cart/cartItems']);
    const priceTotal = computed(() => store.getters['cart/priceTotal']);
    const showModal = computed(() => store.getters['modal/showModal']);

    return {
      cart,
      priceTotal,
      showModal,
      turnHoverOn: (item: CartItem) => store.commit('cart/turnHoverOn', item),
      turnHoverOff: (item: CartItem) => store.commit('cart/turnHoverOff', item),

    }
  }
});
</script>

<style scoped lang="scss">
.np-cartProducts__item {
  @apply w-full flex px-12 py-2 text-lg;

  &:hover {
    .np-productsHover {
      @apply bg-white;
    }
  }

  &__image {
    @apply w-16 h-14;
  }

  &__price {
    @apply flex justify-between w-full px-12 pt-6 font-bold text-secondary-dark mr-2 text-xl;
  }

}

</style>