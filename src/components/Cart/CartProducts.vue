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

      <p class="np-cartProducts__item__quantity text-secondary-light"> {{ item.quantity + ' x ' }}
        <span v-if="item.name.length < 14"
              class="np-cartProducts__item__name">{{ item.name.toUpperCase() }}
        </span>

        <span v-else
              class="np-cartProducts__item__name">{{ item.name.substring(0, 12).concat("..").toUpperCase() }}
        </span>
      </p>

      <p class="np-cartProducts__item__price">{{ '$' + item.price * item.quantity }}</p>
    </div>

    <div v-else class="np-cartProducts__item__details">
      <div class="np-cartProducts__item__actions">
        <p :class="{'text-secondary-light': item.quantity === 1}"
           class="np-cartProducts__item__action"
           @click="decrement(item)"> - </p>

        <p class=" np-cartProducts__item__quantity text-secondary-dark"> {{ item.quantity }}</p>
        <p class="np-cartProducts__item__action" @click="increment(item)"> +</p>
      </div>

      <img class="np-cartProducts__item__cross"
           @click="removeFromCart(item)"
           src="../../assets/remove.png"
           alt="delete">
    </div>
  </div>
</template>

<script>
import {useStore} from "@/store";
import {computed, ref} from "vue";

export default {
  setup() {
    const store = useStore();
    const cart = computed(() => store.getters['cart/cartItems']);

    return {
      cart,
      turnHoverOn: (item) => store.commit('cart/turnHoverOn', item),
      turnHoverOff: (item) => store.commit('cart/turnHoverOff', item),
      increment: (item) => store.commit('cart/incrementQuantity', item),
      decrement: (item) => store.commit('cart/decrementQuantity', item),
      removeFromCart: (item) => store.commit('cart/removeFromCart', item)
    }
  }
}
</script>

<style scoped lang="scss">
.np-cartProducts__item {
  @apply w-full flex px-6 py-2;

  &:hover {
    .np-cartProducts__item__details {
      background-color: #fff;
    }
  }

  &__details {
    @apply flex items-center justify-between w-full;
  }

  &__actions {
    @apply flex ml-4;
  }

  &__action {
    @apply px-1 font-bold;
    cursor: pointer;
  }

  &__image {
    @apply w-16 h-16;
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

</style>