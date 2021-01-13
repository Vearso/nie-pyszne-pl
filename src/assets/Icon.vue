<template>
  <svg :fill="color"
       :class="className"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink"
       x="0px"
       y="0px"
       viewBox="0 0 512.005 512.005"
       style="enable-background:new 0 0 512.005 512.005;"
       xml:space="preserve">
    <component :is="iconLoader" />
  </svg>
</template>

<script>
export default {
  props: {
    name: String,
    color: String,
    className: String
  },
  computed: {
    iconLoader() {
      return () => import("@/assets/icons/" + name + ".vue");
    },
  },
}
</script>