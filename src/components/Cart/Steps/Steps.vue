<template>
  <div class="np-cart__steps__container">
    <div v-for="(element,index) in steps" :key="index" class="np-cart__step">
      <div v-if="stepValue - 1 === index" class="np-cart__step__circle--active"/>
      <div v-if="stepValue - 1 > index" class="np-cart__step__circle--completed"/>
      <div v-if="stepValue - 1 < index" class="np-cart__step__circle--waiting"/>
      <p v-if="stepValue-1 > index" class="text-primary">{{ element }}</p>
      <p v-if="stepValue-1 < index" class="text-secondary">{{ element }}</p>
      <p v-if="stepValue-1 === index">{{ element }}</p>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapGetters} from "vuex";

const Steps = defineComponent({
  data() {
    return {
      steps: ['My order', 'Information', 'Summary'],
    }
  },
  computed: {
    ...mapGetters('sideMenu', ['stepValue']),
  }
});
export default Steps;
</script>

<style scoped lang="scss">
.np-cart__steps__container {
  @apply flex justify-between w-full px-12;
  .np-cart__step {
    @apply flex flex-col items-center;
    &__circle--active {
      @apply bg-secondary border-2 border-primary w-4 h-4 rounded-full;
    }

    &__circle--completed {
      @apply bg-primary w-4 h-4 rounded-full;
    }

    &__circle--waiting {
      @apply bg-secondary w-4 h-4 rounded-full;
    }
  }
}
</style>