<template>
  <div class="np-sign-in">
    <h2 class="np-sign-in__title">{{ $t("signIn") }}</h2>
    <VForm :validation-schema="schema">
      <div class="field-container">
        <VField name="email" placeholder="{{$t('email')}}" />
        <ErrorMessage name="email" />
      </div>
      <div class="field-container">
        <VField
          name="password"
          type="password"
          placeholder="{{$t('password')}}"
        />
        <ErrorMessage name="password" />
      </div>
      <div class="np-sign-in__container">
        <button class="np-sign-in__button" type="submit">
          {{ $t("signIn") }}
        </button>

        <button @click.prevent="goBack()" class="np-sign-in__button">
          {{ $t("return") }}
        </button>

        <p class="np-sign-in__text">
          {{ $t("signUpMessage") }}
          <strong>
            <router-link :to="{ name: 'SignUp' }">{{
              ` ${$t("signUp")} `
            }}</router-link>
          </strong>
        </p>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts">
import { ErrorMessage } from "vee-validate";
import * as VeeValidate from "vee-validate";
import * as yup from "yup";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SignIn",
  components: {
    VField: VeeValidate.Field,
    VForm: VeeValidate.Form,
    ErrorMessage
  },
  setup() {
    const router = useRouter();

    const goBack = (e: Event) => {
      router.back();
    };
    const schema = yup.object({
      email: yup
        .string()
        .required()
        .email(),
      password: yup.string().required()
    });
    return {
      schema,
      goBack
    };
  }
});
</script>

<style scoped lang="scss">
.np-sign-in {
  @apply w-full h-screen bg-secondary-lighter flex flex-col justify-center items-center;

  input {
    @apply p-2 mt-4 h-10 mb-2 w-full;
  }

  span {
    @apply text-alert text-base font-light m-1 h-2 text-xs;
  }

  .field-container {
    @apply flex flex-col;
  }

  &__title {
    @apply text-2xl font-bold;
  }

  &__button {
    @apply px-4 py-2 bg-primary text-white mt-5 mx-4;
  }

  &__text {
    @apply mt-2 mx-1;
  }
}
</style>
