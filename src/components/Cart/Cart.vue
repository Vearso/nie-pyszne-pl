<template>
  <aside v-if="!opened" class="np-cart--closed">
    <div class="np-cart__avatar"></div>
    <div class="np-cart__arrow__container" @click=toggleCart>
      <img alt="left arrow" class="np-cart__arrow" v-bind:src="leftArrow"/>
    </div>
  </aside>
  <aside v-else class="np-cart--opened">
    <div class="np-cart__user">
      <img src="src/assets/logo.png" alt="avatar" class="np-cart__user__avatar">
      <div class="np-cart__user__wrapper">
        <h2 class="np-cart__user__wrapper__name">{{ username }}</h2>
        <a class="np-cart__user__wrapper__logout">Sign out</a>
      </div>
    </div>

    <div class="np-cart__steps__container">
      <div v-for="(step,index) in steps" :key="index" class="np-cart__step">
        <div class="np-cart__step__circle"/>
        <p>{{ step }}</p>
      </div>
    </div>

    <div class="np-cart__summary">
      <div class="np-cart__summary__price">
        <p>Total:</p>
        <p>${{ price.toFixed(2) }}</p>
      </div>
      <button class="np-cart__summary__button">Next</button>
    </div>

    <div class="np-cart__arrow__container" @click=toggleCart>
      <img alt="right arrow" class="np-cart__arrow" v-bind:src="rightArrow"/>
    </div>
  </aside>
</template>

<script lang="ts">
import {defineComponent} from "vue";

const Cart = defineComponent({
  data() {
    return {
      leftArrow: 'https://www.flaticon.com/svg/vstatic/svg/271/271220.svg?token=exp=1610449680~hmac=fdfcf071159efaa5ab2fa6cde3dd1758',
      rightArrow: 'https://www.flaticon.com/svg/vstatic/svg/271/271228.svg?token=exp=1610449680~hmac=8769db5a2be5abf094bc17d8753de6f0',
      steps: ['My order', 'Information', 'Summary'],
      price: 0,
    }
  },
  props: {
    username: {
      type: String,
      default: 'Jan Kowalski',
    }
  },
  methods: {
    toggleCart(): void {
      this.$store.commit('toggleMenu');
    }
  },
  computed: {
    opened(): boolean {
      return this.$store.state.menuOpened;
    }
  }
});
export default Cart;
</script>

<style scoped lang="scss">
.np-cart--closed {
  @apply bg-secondary-lighter w-20 h-screen flex justify-center relative;

  .np-cart__avatar {
    @apply h-16 w-16 rounded-full bg-primary mt-6;
  }
}

.np-cart--opened {
  @apply bg-secondary-lighter w-1/4 h-screen flex flex-col items-center relative text-secondary-dark;

  .np-cart__user {
    @apply flex self-start p-12;

    &__avatar {
      @apply h-16 w-16;
    }

    &__wrapper {
      @apply ml-12 text-left;
      &__name {
        @apply text-2xl;
      }

      &__logout {
        @apply text-secondary-darker;
      }
    }
  }
  .np-cart__summary {
    @apply w-full px-12 py-6;
    &__price {
      @apply flex justify-between;
    }
    &__button {
      @apply w-full bg-primary font-bold mt-4 p-1;
        color: #fff;
    }
  }
  .np-cart__steps__container {
    @apply flex justify-between w-full px-12;
    .np-cart__step {
      @apply flex flex-col items-center;
      &__circle {
        @apply bg-primary w-4 h-4 rounded-full;
      }
    }
  }
}

.np-cart__arrow__container {
  @apply h-12 w-12 rounded-full bg-secondary-light absolute -left-6 flex justify-center items-center;
  top: calc(50% - 1.5rem);

  .np-cart__arrow {
    @apply h-8 w-8 absolute left-1.5;
  }
}
</style>
