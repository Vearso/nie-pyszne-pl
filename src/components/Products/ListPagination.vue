<template>
  <div class="np-pagination__wrapper">
    <Arrow class="np-pagination__wrapper__left-arrow"/>
    <label for="pageNumber">
      <input type="text"
             id="pageNumber"
             name="pageNumber"
             class="np-pagination__wrapper__input"/>
    </label>
    <Arrow class="np-pagination__wrapper__right-arrow"/>
  </div>
</template>

<script lang="ts">
import Arrow from '@/assets/icons/icon-arrow.vue';
import {defineComponent} from "vue";

export default defineComponent({
  name: "ListPagination",
  components: {
    Arrow,
  },
});
</script>

<style scoped lang="scss">
.np-pagination__wrapper {
  @apply flex justify-around w-20 mx-auto my-4 items-center;

  &__left-arrow {
    @apply transform rotate-180 h-10 w-10;
  }
  &__input{
    @apply w-6 m-2 text-center;
  }
  &__right-arrow {
    @apply h-10 w-10;
  }
}
</style>