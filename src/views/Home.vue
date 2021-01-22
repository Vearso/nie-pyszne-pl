<template>
  <div class="v-home flex min-h-full">
    <div
      class="np-product-added-modal"
      :class="{ 'np-product-added-modal--in': isProductAdded }"
    >
      <p>{{ t("productAddedToCart") }}</p>
    </div>
    <div class="np-content ">
      <Header />
      <Navigation />
      <ProductsList />
    </div>
    <Cart />
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header/Header.vue";
import Cart from "@/components/Cart/Cart.vue";
import ProductsList from "@/components/Products/ProductsList.vue";
import Navigation from "@/components/Navigation/Navigation.vue";
import { onMounted, defineComponent, provide, ref, Ref } from "vue";
import { useStore } from "@/store";
import router from "@/router";
import { UrlParameters } from "@/utilities/urlHandler";
import orderOptions from "@/components/Navigation/SearchBar/orderOptionsList";
import { OrderOption } from "@/store/navigationInterface";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "Home",
  components: {
    Navigation,
    Header,
    Cart,
    ProductsList
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();

    const isProductAdded: Ref<boolean> = ref(false);
    const updateMessage = (): void => {
      isProductAdded.value = true;
      setTimeout(() => {
        isProductAdded.value = false;
      }, 2000);
    };
    provide("showProductAddedMessage", updateMessage);

    onMounted(async () => {
      await store.dispatch("nav/fetchMenuCategories");
      await store.dispatch("nav/fetchFoodList");
      const params: Partial<UrlParameters> = {
        ...router.currentRoute.value.query
      };

      if (params.foodCategory) {
        store.commit("nav/setActiveFoodCategory", params.foodCategory);
      }
      if (params.filterPhrase) {
        store.commit("nav/setFoodListFilter", params.filterPhrase);
      }
      if (params.listOrder) {
        const option: OrderOption | undefined = orderOptions.find(
          option => option.type === params.listOrder
        );
        if (typeof option != undefined) {
          store.commit("nav/setFoodListOrder", option);
          store.commit("nav/orderFoodList");
        }
      }
      if (params.displayType) {
        params.displayType === "list"
          ? store.commit("nav/toggleFoodListView")
          : null;
      }
      store.commit("nav/filterFoodList");
      store.commit(
        "products/setNumberOfPages",
        store.state.nav.filteredFoodList
      );
      store.commit("products/setResults", store.state.nav.filteredFoodList);
    });

    return {
      isProductAdded,
      t
    };
  }
});
</script>

<style lang="scss" scoped>
.np-product-added-modal {
  @apply flex flex-row justify-center items-center fixed w-screen h-16 sm:z-10;
  font-size: 1.5rem;
  transform: translateY(-4rem);

  &--in {
    animation: 2s ease-out slideModalIn;
  }

  p {
    @apply flex flex-row justify-center items-center bg-primary w-72 h-16 text-white font-bold;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
}
@media (max-width: 760px) {
  .np-product-added-modal {
    &--in {
      animation: 2s ease-out slideModalInMobile;
    }
  }
}
@keyframes slideModalIn {
  from {
    transform: translateY(-4rem);
  }
  5% {
    transform: translateY(0);
  }
  95% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-4rem);
  }
}
@keyframes slideModalInMobile {
  from {
    transform: translateY(-4rem);
  }
  5% {
    transform: translateY(3rem);
  }
  95% {
    transform: translateY(3rem);
  }
  to {
    transform: translateY(-4rem);
  }
}

.np-content {
  @apply mx-auto w-1/2 sm:w-full;
  @screen md {
    min-width: 550px;
  }
}
</style>
