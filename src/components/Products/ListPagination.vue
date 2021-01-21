<template>
  <div class="np-pagination__wrapper">
    <Arrow @click="prevPage()" class="np-pagination__wrapper__left-arrow" />

    <label for="pageNumber">
      <input
        :value="inputValue"
        @change="setPage"
        type="text"
        id="pageNumber"
        name="pageNumber"
        class="np-pagination__wrapper__input"
      />
    </label>
    <Arrow @click="nextPage()" class="np-pagination__wrapper__right-arrow" />
  </div>
</template>

<script scoped lang="ts">
import Arrow from "@/assets/icons/icon-arrow.vue";
import {
  defineComponent,
  computed,
  Ref,
  onUpdated,
  ComputedRef,
  ref
} from "vue";
import { useStore } from "@/store";
import { FoodListItem } from "@/store/navigationInterface";

interface ChangeEvent {
  target: {
    value: number;
  };
}

export default defineComponent({
  name: "ListPagination",
  components: {
    Arrow
  },
  setup(props: any, context: any) {
    const store = useStore();

    const currentPage: ComputedRef<number> = computed(
      () => store.state.products.pageNumber
    );
    const inputValue: Ref<number> = ref(1);
    const nextPage = (): void => {
      store.commit("products/nextPage");
      inputValue.value = currentPage.value;
    };
    const prevPage = (): void => {
      store.commit("products/prevPage");
      inputValue.value = currentPage.value;
    };

    const setPage = (event: ChangeEvent): void => {
      inputValue.value = event.target.value;
      if (
        !(
          +inputValue.value > 0 &&
          +inputValue.value <= store.state.products.numberOfPages
        )
      ) {
        inputValue.value = currentPage.value;
      }
      store.commit("products/setPage", inputValue.value);
    };

    const filteredList: ComputedRef<Array<FoodListItem>> = computed(
      () => store.state.nav.filteredFoodList
    );
    const setResults = (list: Array<FoodListItem>): void =>
      store.commit("products/setResults", list);
    const setNumberOfPages = (list: Array<FoodListItem>): void =>
      store.commit("products/setNumberOfPages", list);

    onUpdated(() => {
      inputValue.value = currentPage.value;
      setNumberOfPages(filteredList.value);
      setResults(filteredList.value);
    });

    return {
      currentPage,
      inputValue,
      setPage,
      nextPage,
      prevPage
    };
  }
});
</script>

<style scoped lang="scss">
.np-pagination__wrapper {
  @apply flex justify-around w-20 mx-auto my-4 items-center;

  &__left-arrow {
    @apply transform rotate-180 h-10 w-10;
  }

  &__input {
    @apply w-6 m-2 text-center;
  }

  &__right-arrow {
    @apply h-10 w-10;
  }
}
</style>
