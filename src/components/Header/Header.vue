<template>
  <header class="np-header">
    <img class="np-header__image"
         :src="image"
         alt="Logo">

    <div class="np-header__wrapper">
      <h1 class="np-header__wrapper__title">{{ title }}</h1>
      <p class="np-header__wrapper__subtitle">{{ subtitle }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop} from 'vue-property-decorator';

export default class Header extends Vue {
  @Prop({default: ''}) readonly image!: string
  @Prop({default: ''}) readonly title!: string
  @Prop({default: ''}) readonly subtitle!: string
}
</script>

<style scoped lang="css">
.np-header {
  @apply flex justify-around w-1/2 max-h-28 place-self-center mx-auto mt-20 bg-primary-light rounded-tr-2xl
}

.np-header__image {
  @apply w-44 h-44 self-center
}

.np-header__wrapper {
  @apply flex flex-col text-left max-w-sm pt-4
}

.np-header__wrapper__title {
  @apply text-3xl font-bold text-primary
}

.np-header__wrapper__subtitle {
  @apply text-base text-secondary-darker
}
</style>