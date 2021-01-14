<template>
  <svg :class="className"
       xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       x="0"
       y="0"
       viewBox="0 0 50 50"
       style="enable-background:new 0 0 50 50;"
       :aria-labelledby="iconName"
       role="presentation">
    <slot />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    iconName: {
      type: String,
      default: "box"
    },
    width: {
      type: [Number, String],
      default: 50
    },
    height: {
      type: [Number, String],
      default: 50
    },
    iconColor: {
      type: String,
      default: "currentColor"
    },
    className: {
      type: String,
      default: ""
    }
  }
});
</script>