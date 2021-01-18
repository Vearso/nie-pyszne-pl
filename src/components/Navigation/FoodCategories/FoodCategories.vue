<template>
  <ul class="np-category-list">

    <li class="np-category-list__item"
        v-for="category in categories"
        @click="setActiveCategory(category.categoryType)"
        :id="category.categoryType"
        :class="activeCategory === category.categoryType ? 'np-category-list__item--active' : ''"
        :key="category.name">

      <component :is="category.iconUrl" />
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
    const categories: Array<CategoryListItem> = store.state.nav.categoryList;
    const activeCategory: ComputedRef<string> = computed(() => store.state.nav.activeFoodCategory);

    const setActiveCategory = (activeCategory: string): void => {
      router.replace({
        path: "/",
        query: {
          ...router.currentRoute.value.query,
          foodCategory: activeCategory
        }
      });
      store.commit("nav/setActiveFoodCategory", activeCategory);
      store.commit("nav/filterFoodByCategory");
    };

    return {
      categories,
      activeCategory,
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
.np-category-list{
  @apply flex flex-row justify-start w-full;

  height: 60px;
  margin-bottom: 40px;

  &__item {
    @apply flex flex-row items-center;

    color: theme("colors.secondary.DEFAULT");
    font-size: 18px;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
      color: theme('colors.secondary.darker');

      svg {
        fill: theme('colors.secondary.darker');
      }
    }
    &:last-child {
      margin-right: 0;
    }

    svg {
      width: 35px;
      height: 35px;
      margin-right: 20px;
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
        color: theme('colors.primary.DEFAULT');

        svg {
          fill: theme('colors.primary.DEFAULT');
        }
      }
    }
  }
}
</style>
