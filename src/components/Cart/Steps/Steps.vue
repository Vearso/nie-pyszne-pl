<template>
  <div class="np-steps">
    <div
      v-for="(stepName, index) in $tm('menuSteps', { returnObjects: true })"
      :key="index"
      class="np-steps__wrapper"
    >
      <div
        :class="{
          'np-steps__wrapper__step--active': active(index),
          'np-steps__wrapper__step--completed': completed(index),
          'np-steps__wrapper__step--waiting': waiting(index)
        }"
      />

      <p
        :class="{
          'text-secondary-dark': active(index),
          'text-primary': completed(index),
          'text-secondary': waiting(index)
        }"
      >
        {{ stepName }}
      </p>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/store";
import { computed } from "vue";

export default {
  setup(props) {
    const store = useStore();
    const stepValue = computed(() => store.getters["sideMenu/stepValue"]);

    const completed = index =>
      stepValue.value - 1 > index || stepValue.value === 3;
    const active = index =>
      stepValue.value - 1 === index && stepValue.value !== 3;
    const waiting = index => stepValue.value - 1 < index;

    return {
      stepValue,
      completed,
      active,
      waiting
    };
  }
};
</script>

<style scoped lang="scss">
.np-steps {
  @apply flex justify-between w-full px-12;

  &__wrapper {
    @apply flex flex-col items-center;

    &__step--active {
      @apply bg-secondary border-2 border-primary w-4 h-4 rounded-full;
    }

    &__step--completed {
      @apply bg-primary w-4 h-4 rounded-full;
    }

    &__step--waiting {
      @apply bg-secondary w-4 h-4 rounded-full;
    }
  }
}
</style>