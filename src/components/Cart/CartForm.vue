<template>
  <div class="cart-form">
    <Form :validation-schema="schema">
      <div class="field-container">
        <Field name="name" placeholder="Name"/>
        <ErrorMessage name="name" />
      </div>
      <div class="field-container">
        <Field name="email" placeholder="E-mail"/>
        <ErrorMessage name="email" />
      </div>
      <div class="field-container">
        <Field name="phone" placeholder="Phone"/>
        <ErrorMessage name="phone" />
      </div>
      <div class="field-container">
        <Field name="city" placeholder="City"/>
        <ErrorMessage name="city" />
      </div>
      <div class="field-container">
        <Field name="street" placeholder="Street"/>
        <ErrorMessage name="street" />
      </div>
      <div class="field-container">
        <Field name="postCode" placeholder="Post code"/>
        <ErrorMessage name="postCode"/>
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
