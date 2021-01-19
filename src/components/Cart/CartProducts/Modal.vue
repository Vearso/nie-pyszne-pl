<template>
  <teleport to="#modal">
    <div class="shadow">
      <div class="np-Modal">
        <p class="np-Modal__text"> {{ $t('deleteProduct') }} </p>

        <div class="np-Modal__product">
          <img :src="itemToDelete.imgUrl"
               :alt="itemToDelete.name"
               class="np-Modal__product__image"/>

          <p class="np-Modal__product__name"> {{ itemToDelete.name.toUpperCase() }} </p>
        </div>

        <div class="np-Modal__wrapper">
          <button @click="deleteItem(itemToDelete)"
                  class="np-Modal__wrapper__button">

            {{ $t('yes') }}
          </button>

          <button @click="hideModal()"
                  class="np-Modal__wrapper__button">

            {{ $t('no') }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {CartItem} from "@/store/interfaces";
import {defineComponent, computed} from "vue";
import {useStore} from "@/store";

export default defineComponent({
  name: "Modal",

  setup() {
    const store = useStore();

    const itemToDelete = computed(() => store.getters['modal/productToDelete']);

    const removeFromCart = (item: CartItem): void => store.commit('cart/removeFromCart', item)
    const hideModal = (): void => store.commit('modal/hideModal');
    const deleteItem = (item: CartItem): void => {
      removeFromCart(item);
      hideModal();
    }

    return {
      itemToDelete,
      deleteItem,
      hideModal,
      removeFromCart,
    }
  }
});

</script>

<style scoped lang="scss">
.np-Modal {
  @apply h-60 bg-secondary-lighter flex flex-col justify-between rounded-2xl absolute;
  width: 30vw;
  bottom: calc(50vh - 5rem);
  left: 35vw;
  @apply sm:w-full sm:h-1/2 sm:top-1/4 sm:left-0;

  &__text {
    @apply text-center font-bold p-4 text-primary text-xl;
  }

  &__product {
    @apply flex justify-center items-center;
    &__image {
      @apply w-16 h-14;
    }

    &__name {
      @apply font-bold text-secondary-dark px-2 text-lg;
    }
  }
  &__wrapper {
    @apply flex justify-around;

    &__button {
      @apply bg-primary px-4 py-2 m-4 font-bold text-white;
    }
  }
}

.shadow {
  @apply w-screen h-screen bg-shadow absolute top-0;
}
</style>