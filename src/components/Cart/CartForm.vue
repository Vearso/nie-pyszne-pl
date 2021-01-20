<template>
  <div class="cart-form">
    <VForm :validation-schema="schema" v-slot="{ meta }">
      <div class="field-container">
        <VField name="name" placeholder="Name" />
        <ErrorMessage name="name" />
      </div>
      <div class="field-container">
        <VField name="email" placeholder="E-mail" />
        <ErrorMessage name="email" />
      </div>
      <div class="field-container">
        <VField name="phone" placeholder="Phone" />
        <ErrorMessage name="phone" />
      </div>
      <div class="field-container">
        <VField name="city" placeholder="City" />
        <ErrorMessage name="city" />
      </div>
      <div class="field-container">
        <VField name="street" placeholder="Street" />
        <ErrorMessage name="street" />
      </div>
      <div class="field-container">
        <VField name="postCode" placeholder="Post code" />
        <ErrorMessage name="postCode" />
      </div>
      <Buttons :isFormValid="meta.valid"/>
    </VForm>
  </div>
</template>

<script>
import { ErrorMessage } from "vee-validate";
import * as VeeValidate from "vee-validate";
import * as yup from "yup";
import {defineComponent} from "vue";
import Buttons from "@/components/Cart/Steps/Buttons";
import "yup-phone";
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: "CartForm",
  components: {
    Buttons,
    VField: VeeValidate.Field,
    VForm: VeeValidate.Form,
    ErrorMessage
  },

  setup() {
    const {t} = useI18n();
    const schema = yup.object({
      name: yup.string().required(t('orderValidation.nameRequired')),
      email: yup.string()
          .required(t('orderValidation.emailRequired'))
          .email(t('orderValidation.emailFormat')),
      phone: yup.string()
          .phone("PL", false, t('orderValidation.phoneFormat'))
          .required(t('orderValidation.phoneRequired')),
      city: yup.string().required(t('orderValidation.cityRequired')),
      street: yup.string().required(t('orderValidation.streetRequired')),
      postCode: yup.string().required(t('orderValidation.postCodeRequired'))
    });
    return {
      schema
    };
  }
});
</script>

<style lang="scss" scoped>
.cart-form {
  form {
    @apply relative;

    input {
      @apply p-2 mt-6 h-10 mb-3.5;
    }
  }

  span {
    @apply text-left text-alert text-base font-light absolute h-1.5 text-xs bottom-0.5;
    font-family: Roboto, sans-serif;
  }

  .field-container {
    @apply flex flex-col relative;
  }
}
</style>
