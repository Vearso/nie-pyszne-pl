<template>
  <header class="np-header">
    <Logo class="np-header__image" />
    <div class="np-header__wrapper">
      <h1 class="np-header__wrapper__title">{{ t("headerTitle") }}</h1>
      <p class="np-header__wrapper__subtitle">{{ t("headerSubtitle") }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import Logo from "@/assets/icons/icon-logo.vue";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "Header",
  setup() {
    const { t } = useI18n();
    return {
      t
    };
  },
  components: {
    Logo
  }
});
</script>

<style scoped lang="scss">
.np-header {
  @apply flex justify-around max-h-28 mx-auto mt-20 bg-primary-light rounded-tr-2xl mb-6 sm:w-full sm:mt-16;

  &__image {
    @apply w-44 h-44 self-center sm:p-2;
  }

  &__wrapper {
    @apply flex flex-col text-left max-w-sm pt-4;

    &__title {
      @apply text-3xl font-bold text-primary sm:text-xl;
    }

    &__subtitle {
      @apply text-base text-secondary-darker sm:text-xs;
    }
  }
}
</style>
