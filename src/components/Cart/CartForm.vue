<template>
  <div class="cart-form">
    <Form :validation-schema="schema">
      <div class="field-container">
        <Field name="name"/>
        <ErrorMessage name="name" />
      </div>
      <div class="field-container">
        <Field name="email" />
        <ErrorMessage name="email" />
      </div>
      <div class="field-container">
        <Field name="phone" />
        <ErrorMessage name="phone" />
      </div>
      <div class="field-container">
        <Field name="city" />
        <ErrorMessage name="city" />
      </div>
      <div class="field-container">
        <Field name="street" />
        <ErrorMessage name="street" />
      </div>
      <div class="field-container">
        <Field name="postCode"/>
        <ErrorMessage name="postCode" />
      </div>
    </Form>
  </div>
</template>

<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from 'yup';

export default {
  name: "CartForm",
  components: {
    Field,
    Form,
    ErrorMessage
  },
  setup() {
    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      phone: yup.number().required().positive(),
      city: yup.string().required(),
      street: yup.string().required(),
      postCode: yup.string().required()
    });
    return { schema };
  }
};
</script>

<style lang="scss" scoped>
.cart-form {
  form {
    background-color: #f8f8f7;
    position: relative;

    input {
      @apply p-2 mt-6 h-10;
    }
  }

  span {
    @apply text-left text-alert text-base font-light absolute h-1.5;
    bottom: -0.5rem;
    font-size: 0.75rem;
  }

  .field-container {
    @apply flex flex-col;
    position: relative;
  }
}
</style>
