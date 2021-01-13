<template>
  <aside v-if="!openedValue" class="np-cart--closed">
    <img :src="userAvatar" alt="avatar" class="np-cart__avatar"/>
    <div class="np-cart__arrow__container" @click="toggleMenu">
      <img alt="left arrow" class="np-cart__arrow" :src="leftArrow"/>
    </div>
  </aside>

  <aside v-else class="np-cart--opened">
    <User/>
    <Steps/>
    <Summary/>
    <div class="np-cart__arrow__container" @click=toggleMenu>
      <img alt="right arrow" class="np-cart__arrow" :src="rightArrow"/>
    </div>
  </aside>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapGetters,mapMutations} from "vuex";
import User from "./User/User.vue";
import Steps from "./Steps/Steps.vue";
import Summary from "./Summary/Summary.vue";
import CartList from "./CartList/CartList.vue";

const Cart = defineComponent({
  components: {
    User,
    Steps,
    Summary,
    CartList,
  },
  data() {
    return {
      leftArrow: 'https://www.flaticon.com/svg/vstatic/svg/271/271220.svg?token=exp=1610449680~hmac=fdfcf071159efaa5ab2fa6cde3dd1758',
      rightArrow: 'https://www.flaticon.com/svg/vstatic/svg/271/271228.svg?token=exp=1610449680~hmac=8769db5a2be5abf094bc17d8753de6f0',
    }
  },
  props: {
    userAvatar: {
      type: String,
      default: 'https://www.flaticon.com/svg/vstatic/svg/709/709722.svg?token=exp=1610530566~hmac=696747298203e1fd530d44bf33b36319'
    }
  },
  methods: {
    ...mapMutations("sideMenu",["toggleMenu"]),
  },
  computed: {
    ...mapGetters("sideMenu",["openedValue"]),
  }
});
export default Cart;
</script>

<style scoped lang="scss">
.np-cart--closed {
  @apply bg-secondary-lighter w-20 h-screen flex justify-center relative;

  .np-cart__avatar {
    @apply h-12 w-12 rounded-full mt-6;
  }
}

.np-cart--opened {
  @apply bg-secondary-lighter w-1/4 h-screen flex flex-col items-center relative text-secondary-dark;

}

.np-cart__arrow__container {
  @apply h-12 w-12 rounded-full bg-secondary-light absolute -left-6 flex justify-center items-center;
  top: calc(50% - 1.5rem);

  .np-cart__arrow {
    @apply h-8 w-8 absolute left-1.5;
  }
}
</style>
