<template>
  <div
    :key="item.id"
    @mouseover="turnHoverOn(item)"
    @mouseleave="turnHoverOff(item)"
    v-for="item in page"
    class="np-cartProducts__item"
  >
    <img
      :src="item.imgUrl"
      :alt="item.name"
      class="np-cartProducts__item__image"
    />

    <ProductsDetails v-if="!item.isHoveredOn" :item="item" />
    <ProductsHover v-else :item="item" />
  </div>

  <!--  Pagination-->
  <div class="np-cartProducts__pagination" v-if="pagesCount > 1">
    <Arrow
      @click="prevPage"
      class="pagination__arrow pagination__arrow--left"
    />
    <label for="pageNumber">
      <input
        :value="inputValue"
        @change="setPage"
        type="text"
        id="pageNumber"
        name="pageNumber"
        class="pagination__input"
      />
    </label>
    <Arrow
      @click="nextPage"
      class="pagination__arrow pagination__arrow--right"
    />
  </div>
  <!--End of pagination-->

  <div v-if="!page.length" class="np-cartProducts--empty">
    <IconRestaurant class="np-cartProducts--empty__image"></IconRestaurant>
    <h2 class="np-cartProducts--empty__title">{{ t("emptyCart") }}</h2>
  </div>

  <div class="np-cartProducts__item__price">
    <p>{{ t("totalPrice") }}</p>
    <p>{{ t("currency") + priceTotal.toFixed(2) }}</p>
  </div>

  <Buttons />

  <Modal v-if="showModal" />
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, watch, ref, Ref, ComputedRef } from "vue";
import Buttons from "@/components/Cart/Steps/Buttons.vue";
import { CartItem } from "@/store/interfaces";
import ProductsDetails from "@/components/Cart/CartProducts/ProductsDetails.vue";
import ProductsHover from "@/components/Cart/CartProducts/ProductsHover.vue";
import Modal from "@/components/Cart/CartProducts/Modal.vue";
import IconRestaurant from "@/assets/icons/food/icon-resturant.vue";
import { useI18n } from "vue-i18n";
import Arrow from "@/assets/icons/icon-arrow.vue";

interface ChangeEvent {
  target: {
    value: number;
  };
}

export default defineComponent({
  name: "cartProducts",
  components: {
    ProductsDetails,
    ProductsHover,
    Modal,
    Buttons,
    IconRestaurant,
    Arrow
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();

    const priceTotal: ComputedRef<number> = computed(
      () => store.getters["cart/priceTotal"]
    );
    const showModal: ComputedRef<boolean> = computed(
      () => store.getters["modal/showModal"]
    );
    const updatePrice = (): void => {
      store.commit("cart/calculatePrice");
    };
    const cart: ComputedRef<CartItem[]> = computed(
      () => store.getters["cart/cartItems"]
    );
    const page: ComputedRef<CartItem[]> = computed(
      () => store.getters["cart/getPage"]
    );
    console.log(page.value);
    const pagesCount: ComputedRef<number> = computed(
      () => store.state.cart.pagesCount
    );
    const currentPage: ComputedRef<number> = computed(
      () => store.state.cart.currentPage
    );
    const inputValue: Ref<number> = ref(1);
    watch(currentPage, () => (inputValue.value = currentPage.value));
    watch(store.state.cart.items, updatePrice);

    const prevPage = (): void => {
      store.commit("cart/prevPage");
    };
    const nextPage = (): void => {
      store.commit("cart/nextPage");
    };
    const setPage = (event: ChangeEvent): void => {
      const newValue: number = event.target.value;
      inputValue.value = newValue;
      newValue <= pagesCount.value && newValue > 0
        ? store.commit("cart/setPage", newValue)
        : (inputValue.value = currentPage.value);
    };

    store.commit("cart/calculatePrice");
    store.commit("cart/calculatePagesCount");
    store.commit("cart/setPages");
    return {
      t,
      cart,
      page,
      priceTotal,
      showModal,
      inputValue,
      pagesCount,
      prevPage,
      nextPage,
      setPage,
      turnHoverOn: (item: CartItem) => store.commit("cart/turnHoverOn", item),
      turnHoverOff: (item: CartItem) => store.commit("cart/turnHoverOff", item)
    };
  }
});
</script>

<style scoped lang="scss">
.np-cartProducts__item {
  @apply w-full flex px-12 py-2 text-lg;

  &:hover {
    .np-productsHover {
      @apply bg-white;
    }
  }

  &__image {
    @apply w-16 h-14;
  }

  &__price {
    @apply flex justify-between w-full px-12 pt-6 font-bold text-secondary-dark mr-2 text-xl;
  }
}

.np-cartProducts--empty {
  @apply flex flex-col justify-center items-center px-12 py-2;

  &__image {
    @apply w-12 h-12 fill-current text-primary;
  }

  &__title {
    @apply font-bold py-4;
  }
}

.np-cartProducts__pagination {
  @apply flex items-center w-20 mx-auto my-4;
  .pagination__input {
    @apply w-6 m-2 text-center;
  }
  .pagination__arrow {
    @apply h-5 w-5 cursor-pointer;

    &--left {
      @apply transform rotate-180;
    }
  }
}
</style>
