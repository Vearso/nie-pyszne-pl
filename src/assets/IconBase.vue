<template>
  <svg :class="className"
       xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       x="0"
       y="0"
       :viewBox="svgViewBox"
       :style="svgStyle"
       :aria-labelledby="iconName"
       role="presentation">
    <slot @saveViewBox="setStyleAndBox"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true,
      default: "box"
    },
    width: {
      type: [Number, String],
      required: false,
      default: 50
    },
    height: {
      type: [Number, String],
      required: false,
      default: 50
    },
    iconColor: {
      type: String,
      required: false,
      default: "#acacac"
    },
    className: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(props: any){
      const svgViewBox = ref("");
      const svgStyle = ref("");

      const setStyleAndBox = function (box: string):void {
        console.log("this is viewbox: " + box);
        // svgStyle.value = style;
        svgViewBox.value = box;
      }


      return {
        setStyleAndBox,
        svgViewBox,
        svgStyle
      }
  }
});
</script>