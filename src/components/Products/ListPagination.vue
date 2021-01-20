<template>
  <div class="np-pagination__wrapper">
    <Arrow @click="prevPage()"
           class="np-pagination__wrapper__left-arrow"/>

    <label for="pageNumber">
      <input @change="e => setPageNumber(e.target.value)"
             :value="currentPage"
             type="text"
             id="pageNumber"
             name="pageNumber"
             class="np-pagination__wrapper__input"/>
    </label>

    <Arrow @click="nextPage()"
           class="np-pagination__wrapper__right-arrow"/>
  </div>
</template>

<script lang="ts">
import Arrow from '@/assets/icons/icon-arrow.vue';
import {defineComponent, computed, onMounted, onUpdated, ComputedRef} from "vue";
import {useStore} from "@/store";
import {FoodListItem} from "@/store/navigationInterface";

export default defineComponent({
  name: "ListPagination",
  components: {
    Arrow,
  },
  setup() {
    const store = useStore();

    let currentPage = computed(() => store.state.products.pageNumber);


    const nextPage = () => store.commit('products/nextPage');
    const prevPage = () => store.commit('products/prevPage');
    const setPageNumber = (page: number) => {
      store.commit('products/setPage', page);
      currentPage = computed(()=> store.getters['products/getPage']);
    }

    const filteredList: ComputedRef<Array<FoodListItem>> = computed(() => store.state.nav.filteredFoodList);
    const setResults = (list: Array<FoodListItem>) => store.commit('products/setResults', list);
    const setNumberOfPages = (list: Array<FoodListItem>) => store.commit('products/setNumberOfPages', list);

    setNumberOfPages(filteredList.value)

    onUpdated(() => {
      setResults(filteredList.value);
    })

    return {
      currentPage,
      setPageNumber,
      nextPage,
      prevPage,
    }
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