<template>
  <div class="np-cart__summary">
    <div class="np-cart__summary__price">
      <p>Total:</p>
      <p>${{ price.toFixed(2) }}</p>
    </div>

    <button v-if="stepValue < 3" class="np-cart__summary__button" @click="nextStep">Next</button>
    <button v-else class="np-cart__summary__button" @click="resetOrder">Add new order</button>
    <button v-if="stepValue === 2" class="np-cart__summary__button" @click="prevStep">Previous</button>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapGetters, mapMutations} from "vuex";

const Summary = defineComponent({
  data() {
    return{
      price: 0,
    }
  },
  methods: {
    ...mapMutations('sideMenu',['nextStep','prevStep','resetOrder']),
  },
  computed: {
    ...mapGetters('sideMenu', ['stepValue']),
  }
});
export default Summary;
</script>

<style scoped lang="scss">

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

</style>