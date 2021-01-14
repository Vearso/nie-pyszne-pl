<template>
  <div class="np-steps">
    <div v-for="(element, index) in $tm('menuSteps',{returnObjects: true})"
         :key="index"
         class="np-steps__step">

      <div :class="{
        active: stepValue - 1 === index,
        completed: stepValue - 1 > index,
        waiting: stepValue - 1 < index,}"/>
      <p :class="{
        '':stepValue - 1 === index,
        'text-primary': stepValue - 1 > index,
        'text-secondary': stepValue - 1 < index}">{{ element }}
      </p>
    </div>
  </div>
</template>

<script>
import {useStore} from "@/store";
import {computed} from "vue";

export default {
  setup(props) {
    const store = useStore();
    const stepValue = computed(() => store.getters["sideMenu/stepValue"]);
    console.log(stepValue);
    return {
      stepValue
    }
  },
}
</script>

<style scoped lang="scss">
.np-steps {
  @apply flex justify-between w-full px-12;

  &__step {
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
