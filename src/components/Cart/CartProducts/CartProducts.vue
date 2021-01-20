<template>
  <div :key="item.id"
       @mouseover="turnHoverOn(item)"
       @mouseleave="turnHoverOff(item)"
       v-for="item in cart"
       class="np-cartProducts__item">

    <img :src="item.imgUrl"
         :alt="item.name"
         class="np-cartProducts__item__image"/>

    <ProductsDetails v-if="!item.isHoveredOn" :item="item"/>
    <ProductsHover v-else :item="item"/>
  </div>

  <div v-if="cart.length === 0"
       class="np-cartProducts__empty">

    <IconRestaurant class="np-cartProducts__empty__image"></IconRestaurant>
    <h2 class="np-cartProducts__empty__title">{{ $t('emptyCart') }}</h2>
  </div>

  <div class="np-cartProducts__item__price">
    <p>{{ $t('totalPrice') }}</p>
    <p>{{ $t("currency") + priceTotal.toFixed(2) }}</p>
  </div>

  <Buttons/>

  <Modal v-if="showModal"/>
</template>

<script lang="ts">
import {useStore} from "@/store";
import {computed, defineComponent, onMounted, onUpdated} from "vue";
import Buttons from "@/components/Cart/Steps/Buttons.vue";
import {CartItem, CartState} from "@/store/interfaces";
import ProductsDetails from "@/components/Cart/CartProducts/ProductsDetails.vue";
import ProductsHover from "@/components/Cart/CartProducts/ProductsHover.vue";
import Modal from "@/components/Cart/CartProducts/Modal.vue";
import IconRestaurant from "@/assets/icons/food/icon-resturant.vue"

export default defineComponent({

  name: "cartProducts",
  components: {
    ProductsDetails,
    ProductsHover,
    Modal,
    Buttons,
    IconRestaurant,
  },
  setup() {
    const store = useStore();

    const cart = computed(() => store.getters['cart/cartItems']);
    const priceTotal = computed(() => store.getters['cart/priceTotal']);
    const showModal = computed(() => store.getters['modal/showModal']);

    store.commit('cart/calculatePrice');

    onUpdated(() => {
      store.commit('cart/calculatePrice');
    })

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

.np-cartProducts__empty {
  @apply flex flex-col justify-center items-center px-12 py-2;

  &__image {
    @apply w-12 h-12 fill-current text-primary;
  }

  &__title {
    @apply font-bold py-4;
  }
}

</style>