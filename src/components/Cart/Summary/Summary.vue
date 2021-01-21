<template>
  <div class="np-Summary">
    <h2 class="np-Summary__title">{{ $t("orderSummary") }}</h2>
    <p class="np-Summary__time">
      {{ $t("time").toUpperCase() }}: {{ displayedTime }}
    </p>
  </div>
  <Buttons />
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ComputedRef, watch } from "vue";
import Buttons from "@/components/Cart/Steps/Buttons.vue";
import { useStore } from "@/store";
import { TimeObject } from "@/store/interfaces";

export default defineComponent({
  name: "Summary",
  components: {
    Buttons
  },
  setup() {
    const store = useStore();

    const time: ComputedRef<TimeObject> = computed(
      () => store.getters["time/calculatedTime"]
    );
    const displayedTime: ComputedRef<string> = computed(
      () => store.getters["time/displayedTime"]
    );
    const clearCart = () => {
      if (
        time.value.hours === 0 &&
        time.value.minutes === 0 &&
        time.value.seconds === 0
      ) {
        store.commit("sideMenu/resetOrder");
        store.commit("cart/clearCart");
      }
    };
    watch(time, clearCart);

    onMounted(() => {
      store.commit("time/setTime");
      store.commit("time/calculateTime");
      store.dispatch("time/countDown");
    });

    return {
      displayedTime,
      time
    };
  }
});
</script>

<style scoped lang="scss">
.np-Summary {
  &__title {
    @apply font-bold my-6;
  }

  &__time {
    @apply text-4xl text-primary mb-10;
  }
}
</style>
