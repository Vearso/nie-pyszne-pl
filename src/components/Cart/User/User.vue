<template>
  <div class="np-cart__user">
    <UserAvatar class="np-cart__user__avatar" />

    <div v-if="!!username" class="np-cart__user__wrapper">
      <h2 class="np-cart__user__wrapper__name">{{ username }}</h2>
      <a @click.prevent="signOut" class="np-cart__user__wrapper__logout">{{
        t("signOut")
      }}</a>
    </div>

    <div v-else class="np-cart__user__wrapper">
      <h2 class="np-cart__user__wrapper__name">{{ t("notSignIn") }}</h2>
      <router-link
        :to="{ ...ROUTE_SIGNIN }"
        class="np-cart__user__wrapper__logout"
        >{{ t("signIn") }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";
import UserAvatar from "@/assets/icons/icon-avatar.vue";
import { ROUTE_SIGNIN } from "@/router";

export default defineComponent({
  components: {
    UserAvatar
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();

    const username: ComputedRef<string> = computed(() => store.state.user.name);
    const signOut = () => {
      store.dispatch("user/doSignOut");
    };
    return {
      t,
      username,
      ROUTE_SIGNIN,
      signOut
    };
  }
});
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
      @apply text-xl;
      @apply sm:text-base;
    }

    &__logout {
      @apply text-secondary-darker mr-2 cursor-pointer;
      @apply sm:text-sm;
    }
  }
}
</style>
