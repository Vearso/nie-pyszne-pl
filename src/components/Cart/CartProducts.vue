<template>
  <h2>Product</h2>
</template>

<script>
import {useStore} from "@/store";

export default {
  setup() {
    const store = useStore();
    console.log(store);

  }
}
</script>

<style scoped>

</style>