<template>
  <div v-for="item in cart"
       :key="item.id"
       class="np-cartProducts__item"
       @mouseover="turnHoverOn(item)"
       @mouseleave="turnHoverOff(item)">

    <img :src="item.imgUrl"
         alt="Food"
         class="np-cartProducts__item__image"/>

    <div class="np-cartProducts__item__details"
         v-if="!item.isHoveredOn">

      <p class="np-cartProducts__item__details__quantity text-secondary-light"> {{ item.quantity + ' x ' }}
        <span v-if="item.name.length < 14"
              class="np-cartProducts__item__details__name">{{ item.name.toUpperCase() }}
        </span>

        <span v-else
              class="np-cartProducts__item__details__name">{{ item.name.substring(0, 12).concat("..").toUpperCase() }}
        </span>
      </p>

      <p class="np-cartProducts__item__details__price">{{ '$' + item.price * item.quantity }}</p>
    </div>

    <div v-else class="np-cartProducts__item__details">
      <div class="np-cartProducts__item__details__actions">
        <span :class="{'text-secondary-light': item.quantity === 1}"
              class="np-cartProducts__item__details__action"
              @click="decrement(item)"> - </span>

        <p class=" np-cartProducts__item__details__quantity text-secondary-dark"> {{ item.quantity }}</p>
        <span class="np-cartProducts__item__details__action"
              @click="increment(item)"> + </span>
      </div>

      <IconCross class="np-cartProducts__item__details__cross"
                 @click="showModal = true; product = item"/>

    </div>
  </div>
  <div class="np-cartProducts__price">
    <p>{{ $t('totalPrice') }}</p>
    <p>${{ price.toFixed(2) }}</p>
  </div>

  <Buttons/>

  <teleport to="#modal">
    <div v-if="showModal" class="shadow">
      <div class="np-modal">
        <p class="np-modal__text">{{ $t('deleteProduct') }}</p>
        <div class="np-modal__wrapper">
          <button class="np-modal__button"
                  @click="removeFromCart(product) ; showModal = false">
            {{ $t('yes') }}
          </button>

          <button class="np-modal__button"
                  @click="showModal = false">
            {{ $t('no') }}
          </button>
        </div>

      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {useStore} from "@/store";
import {computed, ref, ComputedRef, Ref} from "vue";
import Buttons from "@/components/Cart/Summary/Buttons.vue";
import IconCross from "@/assets/icons/icon-cross.vue";
import {CartItem} from "@/store/interfaces";

export default {
  components: {
    Buttons,
    IconCross,
  },
  setup() {
    const store = useStore();
    const cart: ComputedRef<CartItem> = computed(() => store.getters['cart/cartItems']);
    const price: ComputedRef<number> = computed(() => store.getters['cart/priceTotal']);

    const showModal: Ref<boolean> = ref(false);
    const product: Ref<object> = ref({});

    const removeFromCart = (item: CartItem): void => store.commit('cart/removeFromCart', item)
    return {
      cart,
      showModal,
      product,
      price,
      turnHoverOn: (item: CartItem) => store.commit('cart/turnHoverOn', item),
      turnHoverOff: (item: CartItem) => store.commit('cart/turnHoverOff', item),
      increment: (item: CartItem) => store.commit('cart/incrementQuantity', item),
      decrement: (item: CartItem) => store.commit('cart/decrementQuantity', item),
      removeFromCart,
    }
  }
}
</script>

<style scoped lang="scss">
.np-cartProducts__item {
  @apply w-full flex px-12 py-2;

  &:hover {
    .np-cartProducts__item__details {
      background-color: #fff;
    }
  }

  &__image {
    @apply w-16 h-14;
  }

  &__details {
    @apply flex items-center justify-between w-full;


    &__actions {
      @apply flex ml-4;
    }

    &__action {
      @apply px-1 font-bold;
      cursor: pointer;
    }

    &__quantity {
      @apply px-4;
    }

    &__name {
      @apply text-secondary-dark pr-6 font-bold flex-grow;
    }

    &__price {
      @apply text-secondary-dark mr-2;
    }

    &__cross {
      @apply mr-6 w-6 h-6;
      cursor: pointer;
    }
  }

}
.np-cartProducts__price {
  @apply flex justify-between w-full px-12 mt-6;
}
</style>

<style lang="scss">
.shadow {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
}
.np-modal {
  @apply h-40 bg-secondary-lighter flex flex-col justify-between rounded-2xl;
  width: 30vw;
  position: absolute;
  bottom: calc(50vh - 5rem);
  left: 35vw;

  &__wrapper {
    @apply flex justify-around;
  }

  &__text {
    @apply text-center font-bold p-8 text-primary text-xl;
  }

  &__button {
    @apply bg-primary px-4 py-2 m-4 font-bold;
    color: #fff;
  }
}
</style>