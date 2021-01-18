<template>
  <div class="np-Summary">
    <h2 class="np-Summary__title">{{ $t("orderSummary") }}</h2>
    <p class="np-Summary__time">{{ $t("time").toUpperCase() }}: {{ displayedTime(calculateTime(time)) }}</p>
  </div>
  <Buttons/>
</template>

<script lang="ts">
import {defineComponent, onMounted, computed, ComputedRef} from "vue";
import Buttons from "@/components/Cart/Summary/Buttons.vue";

interface TimeObject {
  hours: number,
  minutes: number,
  seconds: number,
}

export default defineComponent({
  name: "Summary",
  components: {
    Buttons
  },
  setup() {
    const time = ;
    const calculateTime = (time: number): TimeObject => {
      const hours = Math.floor((time / 3600));
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = ((time % 3600) % 60);
      return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      }
    }
    const displayedTime = (timeObject: TimeObject): string => {
      return (timeObject.hours
          ? `${timeObject.hours}:${timeObject.minutes}:${timeObject.seconds}`
          : `${timeObject.minutes}:${timeObject.seconds}`)
    }
    const countDownTimer = (): void => {
      if (time > 0) {
        setTimeout(() => {
          countDownTimer();
        }, 1000)
      }
    }
    onMounted(() => {
      countDownTimer();
    })
    return {
      displayedTime,
      calculateTime,
      time,
    }
  }
});
</script>

<style scoped>

</style>