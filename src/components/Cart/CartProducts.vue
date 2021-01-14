<template>
  <div v-for="item in cart"
       :key="item.id"
       class="np-cartProducts__item"
       @mouseover="isHoveredOn = true"
       @mouseleave="isHoveredOn = false">

    <img :src="item.imgUrl"
         alt="Food"
         class="np-cartProducts__item__image"/>

    <div class="np-cartProducts__item__actions"
         v-if="!isHoveredOn">

      <p class="np-cartProducts__item__quantity"> {{ item.quantity + ' x ' }}
        <span v-if="item.name.length < 20"
              class="np-cartProducts__item__name">{{ item.name.toUpperCase() }}
        </span>

        <span v-else
              class="np-cartProducts__item__name">{{ item.name.substring(0, 14).concat("..").toUpperCase() }}
        </span>
      </p>

      <p class="np-cartProducts__item__price">{{ '$' + item.price * item.quantity }}</p>
    </div>

    <div v-else
         class="np-cartProducts__item__actions">

      <p :class="{'active': item.quantity < 1,}"
         class="np-cartProducts__item__action"
         @click="decrement(item)">- </p>
      <p class=" np-cartProducts__item__quantity"> {{ item.quantity }}</p>
      <p class="np-cartProducts__item__action" @click="increment(item)"> +</p>
      <p class="np-cartProducts__item__action" @click="removeFromCart(item)"> X </p>
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
    const isHoveredOn = ref(false);

    return {
      cart,
      isHoveredOn,
      increment: (item) => store.commit('cart/incrementQuantity',item),
      decrement: (item) => store.commit('cart/decrementQuantity',item),
      removeFromCart: (item) => store.commit('cart/removeFromCart',item)
    }
  }
}
</script>

<style scoped lang="scss">
.np-cartProducts__item {
  @apply flex p-1;
  &__actions {
   @apply flex items-center justify-between p-1;
  }
  &__action {
    @apply px-1;
    cursor: pointer;
  }
  &__image {
    @apply w-12 h-12;
  }

  &__quantity {
    @apply text-secondary-light px-4;
  }

  &__name {
    @apply text-secondary-dark pr-6 font-bold;
  }

  &__price {
    @apply text-secondary-dark;
  }
}

</style>