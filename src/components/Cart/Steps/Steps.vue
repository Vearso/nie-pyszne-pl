<template>
  <div class="np-steps">
    <div
      :key="index"
      @click="switchStep(index)"
      v-for="(stepName, index) in $tm('menuSteps', { returnObjects: true })"
      class="np-steps__wrapper"
    >
      <div :class="divClassObject(index)" />
      <p :class="pClassObject(index)">{{ stepName }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import { ComputedRef } from "@vue/reactivity";

export default defineComponent({
  name: "Steps",

  setup() {
    const store = useStore();
    const stepValue: ComputedRef<number> = computed(
      () => store.getters["sideMenu/stepValue"]
    );

    const completed = (index: number): boolean =>
      stepValue.value - 1 > index || stepValue.value === 3;
    const active = (index: number): boolean =>
      stepValue.value - 1 === index && stepValue.value !== 3;
    const waiting = (index: number): boolean => stepValue.value - 1 < index;
    const switchStep = (index: number): void => {
      index === 0 && stepValue.value === 2
        ? store.commit("sideMenu/prevStep")
        : null;
    };

    return {
      stepValue,
      switchStep,
      completed,
      active,
      waiting,
      divClassObject: function(index: number): object {
        return {
          "np-steps__wrapper__step--active": active(index),
          "np-steps__wrapper__step--completed": completed(index),
          "np-steps__wrapper__step--waiting": waiting(index)
        };
      },
      pClassObject: function(index: number): object {
        return {
          "text-secondary-dark np-steps__step__text": active(index),
          "text-primary np-steps__step__text": completed(index),
          "text-secondary np-steps__step__text": waiting(index)
        };
      }
    };
  }
});
</script>

<style scoped lang="scss">
.np-steps {
  @apply flex justify-between w-full px-12 mb-4;

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
  &__step__text {
    @apply sm:text-xs;
  }
}
</style>
