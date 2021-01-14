<template>
  <header class="np-header">
    <img class="np-header__image"
         :src=image
         alt="Logo">

    <div class="np-header__wrapper">
      <h1 class="np-header__wrapper__title">{{ title }}</h1>
      <p class="np-header__wrapper__subtitle">{{ subtitle }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const Header = defineComponent({
  props: {
    image: {
      type: String,
      default: ""
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    }
  }
});
export default Header;
</script>

<style scoped lang="scss">
.np-header {
  @apply flex justify-around w-1/2 max-h-28 place-self-center mx-auto mt-20 bg-primary-light rounded-tr-2xl;

  &__image {
    @apply w-44 h-44 self-center;
  }

  &__wrapper {
    @apply flex flex-col text-left max-w-sm pt-4;

    &__title {
      @apply text-3xl font-bold text-primary;
    }

    &__subtitle {
      @apply text-base text-secondary-darker;
    }
  }
}
</style>