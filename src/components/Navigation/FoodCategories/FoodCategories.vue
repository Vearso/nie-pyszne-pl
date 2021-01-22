<template>
  <ul class="np-category-list">
    <li
      :id="category.categoryType"
      :class="
        activeCategory === category.categoryType
          ? 'np-category-list__item--active'
          : ''
      "
      :key="category.name"
      v-for="category in categories"
      @click="setActiveCategory(category.categoryType)"
      class="np-category-list__item"
    >
      <component :is="checkIcon(category.iconUrl)" />
      <span class="np-category-active">{{ category.name }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
import { useStore } from "@/store/index";
import { CategoryListItem } from "@/store/navigationInterface";
import RestaurantIcon from "@/assets/icons/food/icon-resturant.vue";
import PizzaIcon from "@/assets/icons/food/icon-pizza.vue";
import SushiIcon from "@/assets/icons/food/icon-sushi.vue";
import TacoIcon from "@/assets/icons/food/icon-taco.vue";
import BurgerIcon from "@/assets/icons/food/icon-burger.vue";
import router from "@/router";

export default defineComponent({
  components: {
    PizzaIcon,
    RestaurantIcon,
    SushiIcon,
    TacoIcon,
    BurgerIcon
  },

  setup() {
    const store = useStore();
    const categories: ComputedRef<Array<CategoryListItem>> = computed(
      () => store.state.nav.categoryList
    );
    const activeCategory: ComputedRef<string> = computed(
      () => store.state.nav.activeFoodCategory
    );
    const checkIcon = (iconUrl: string): string => {
      const availableIcons = [
        "PizzaIcon",
        "RestaurantIcon",
        "SushiIcon",
        "TacoIcon",
        "BurgerIcon"
      ];

      for (const icon of availableIcons) {
        if (icon === iconUrl) {
          return iconUrl;
        }
      }
      return "RestaurantIcon";
    };
    const setActiveCategory = (activeCategory: string): void => {
      router.replace({
        path: "/",
        query: {
          ...router.currentRoute.value.query,
          foodCategory: activeCategory
        }
      });
      store.commit("nav/setActiveFoodCategory", activeCategory);
      store.commit("nav/filterFoodList");
      store.commit("products/setPage", 1);
      store.commit(
        "products/setNumberOfPages",
        store.state.nav.filteredFoodList
      );
      store.commit("products/setResults", store.state.nav.filteredFoodList);
    };

    return {
      categories,
      activeCategory,
      checkIcon,
      setActiveCategory
    };
  },
  methods: {
    altText(name: string): string {
      return name + " icon";
    }
  }
});
</script>

<style lang="scss" scoped>
.np-category-list {
  @apply flex flex-row flex-wrap justify-start w-full h-full mb-10;
  @apply sm:justify-center;

  &__item {
    @apply flex flex-row items-center h-16 mr-5;

    color: theme("colors.secondary.DEFAULT");
    font-size: 18px;
    cursor: pointer;

    span {
      @apply sm:hidden block;
    }

    &:hover {
      color: theme("colors.secondary.darker");

      svg {
        fill: theme("colors.secondary.darker");
      }
    }

    &:last-child {
      margin-right: 0;
    }

    svg {
      @apply sm:mr-0 mr-4;
      width: 35px;
      height: 35px;
      fill: theme("colors.secondary.DEFAULT");
    }

    &--active {
      color: theme("colors.primary.DEFAULT");
      border-bottom: 3px solid theme("colors.primary.DEFAULT");
      font-weight: bold;

      svg {
        fill: theme("colors.primary.DEFAULT");
      }

      &:hover {
        color: theme("colors.primary.DEFAULT");

        svg {
          fill: theme("colors.primary.DEFAULT");
        }
      }
    }
  }
}
</style>
