<template>
  <div class="np-sign-in">
    <h2 class="np-sign-in__title">{{ t("signUp") }}</h2>
    <VForm :validation-schema="schema" @submit="onSubmit">
      <div class="field-container">
        <VField :placeholder="t('name')" name="name" />
        <ErrorMessage name="name" />
      </div>
      <div class="field-container">
        <VField :placeholder="t('email')" name="email" />
        <ErrorMessage name="email" />
      </div>
      <div class="field-container">
        <VField :placeholder="t('password')" name="password" type="password" />
        <ErrorMessage name="password" />
      </div>
      <div class="field-container">
        <VField
          :placeholder="t('confirmPassword')"
          name="confirmPassword"
          type="password"
        />
        <ErrorMessage name="confirmPassword" />
      </div>
      <div class="np-sign-in__container">
        <button class="np-sign-in__button" type="submit">
          {{ t("signUp") }}
        </button>

        <button @click.prevent="goBack()" class="np-sign-in__button">
          {{ t("return") }}
        </button>

        <p class="np-sign-in__text">
          {{ t("signInMessage") }}
          <strong>
            <router-link :to="{ name: 'SignIn' }"
              >{{ ` ${t("signIn")}` }}
            </router-link>
          </strong>
        </p>
      </div>
    </VForm>
    <span>{{ fbError }}</span>
  </div>
</template>

<script lang="ts">
import { ErrorMessage } from "vee-validate";
import * as VeeValidate from "vee-validate";
import * as yup from "yup";
import { defineComponent, ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { auth, fb } from "@/utilities/firebase";
import { useStore } from "@/store";

export default defineComponent({
  name: "SignIn",
  components: {
    VField: VeeValidate.Field,
    VForm: VeeValidate.Form,
    ErrorMessage
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const fbError: Ref<string> = ref("");
    const onSubmit = (values: any) => {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(() => {
          const user = {
            name: values.name,
            email: values.email
          };
          store.commit("user/setUpUser", user);
        })
        .then(() => router.push("/"))
        .catch(err => (fbError.value = err.message));
    };
    const goBack = () => {
      router.back();
    };
    const schema = yup.object({
      name: yup.string().required(t("orderValidation.nameRequired")),
      email: yup
        .string()
        .required(t("orderValidation.emailRequired"))
        .email(t("orderValidation.emailFormat")),
      password: yup.string().required(t("orderValidation.passwordRequired")),
      confirmPassword: yup
        .string()
        .required(t("orderValidation.passwordRequired"))
        .oneOf(
          [yup.ref("password"), null],
          t("orderValidation.passwordNotMatch")
        )
    });
    return {
      schema,
      t,
      fbError,
      goBack,
      onSubmit
    };
  }
});
</script>

<style scoped lang="scss">
.np-sign-in {
  @apply w-full h-screen bg-secondary-lighter flex flex-col justify-center items-center;

  input {
    @apply p-2 mt-4 h-10  w-full;
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
