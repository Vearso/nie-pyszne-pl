<template>
  <aside v-if="!opened" class="np-cart__aside">
    <div class="np-cart__avatar"></div>
    <div class="np-cart__arrow__container" @click = toggleCart>
      <img alt="left arrow" class="np-cart__arrow" v-bind:src="leftArrow"/>
    </div>
  </aside>
  <aside v-else class="np-cart__aside">
    <div class="np-cart__avatar"></div>
    <div class="np-cart__arrow__container" @click = toggleCart>
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
    }
  },
  created() {
    console.log(this.$store)
  },
  methods: {
       toggleCart() {
       this.$store.commit('toggleMenu');
       console.log(this.$store.state.menuOpened);
     }
  },
  computed: {
    opened() :boolean {
      return this.$store.state.menuOpened;
    }
  }
});
export default Cart;
</script>

<style scoped lang="scss">
.np-cart__aside {
  @apply bg-secondary-lighter w-20 h-screen flex justify-center relative;
  }

.np-cart__avatar {
  @apply h-16 w-16 rounded-full bg-primary mt-6;
  }

.np-cart__arrow__container {
  @apply h-12 w-12 rounded-full bg-secondary-light absolute -left-6 top-1/2 flex justify-center items-center;
  }

.np-cart__arrow {
  @apply h-8 w-8 absolute left-1.5;
  }

</style>
