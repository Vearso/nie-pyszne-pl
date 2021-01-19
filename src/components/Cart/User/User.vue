<template>
  <div class="np-cart__user">
    <img :src="userAvatar"
         alt="avatar"
         class="np-cart__user__avatar"/>

    <div class="np-cart__user__wrapper">
      <h2 class="np-cart__user__wrapper__name">{{ username }}</h2>
      <a class="np-cart__user__wrapper__logout">{{ $t('signOut') }}</a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    username: {
      type: String,
      default: "Jan Kowalski"
    },
    userAvatar: {
      type: String,
      default:
          "https://www.flaticon.com/svg/vstatic/svg/709/709722.svg?token=exp=1610530566~hmac=696747298203e1fd530d44bf33b36319"
    }
  }
}
</script>

<style scoped lang="scss">
.np-cart__user {
  @apply flex self-start p-12;
  @apply sm:items-center sm:self-center sm:pt-0 sm:pb-6;

  &__avatar {
    @apply h-16 w-16;
    @apply sm:h-10 sm:w-10;
  }

  &__wrapper {
    @apply ml-12 text-left;
    @apply sm:ml-6;
    &__name {
      @apply text-2xl;
      @apply sm:text-lg;
    }

    &__logout {
      @apply text-secondary-darker;
      @apply sm:text-sm;
    }
  }
}
</style>
