<template>
  <div class="cart-form">
    <form class="cart-form__wrapper">
      <label class="cart-form__label">
        <input class="cat-form__input" placeholder="Name and surname" />
      </label>
      <label class="cart-form__label">
        <input class="cat-form__input" placeholder="E-mail" />
      </label>
      <label class="cart-form__label">
        <input class="cat-form__input" placeholder="Phone" />
      </label>
      <label class="cart-form__label">
        <input class="cat-form__input" placeholder="City" />
      </label>
      <label class="cart-form__label">
        <input class="cat-form__input" placeholder="Address" />
      </label>
      <label class="cart-form__label">
        <input class="cat-form__input" placeholder="Post code" />
      </label>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

const CartForm = defineComponent({
  name: "CartForm"
});
export default CartForm;
</script>

<style lang="scss" scoped>
.cart-form {
  &__label {
    @apply flex flex-col;
  }
}

.cat-form {
  &__input {
    @apply block p-2 mt-6 h-8;
  }
}
</style>
