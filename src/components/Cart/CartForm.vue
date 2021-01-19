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
      <Summary :isFormValid="meta.valid" />
    </VForm>
  </div>
</template>

<script>
import { ErrorMessage } from "vee-validate";
import * as VeeValidate from "vee-validate";
import * as yup from "yup";
import "yup-phone";
import Summary from "@/components/Cart/Steps/Buttons";

export default {
  name: "CartForm",
  components: {
    Summary,
    VField: VeeValidate.Field,
    VForm: VeeValidate.Form,
    ErrorMessage
  },
  setup() {
    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string()
          .required()
          .email(),
      phone: yup.string()
          .phone("PL")
          .required(),
      city: yup.string().required(),
      street: yup.string().required(),
      postCode: yup.string().required()
    });
    return {
      schema
    };
  }
};
</script>

<style lang="scss" scoped>
.cart-form {
  form {
    @apply relative;

    input {
      @apply p-2 mt-6 h-10 mb-2;
    }
  }

  span {
    @apply text-left text-alert text-base font-light absolute h-1.5 text-xs bottom-0.5;
  }

  .field-container {
    @apply flex flex-col relative;
  }
}
</style>
