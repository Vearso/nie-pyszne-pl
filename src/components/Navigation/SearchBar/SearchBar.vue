<template>
  <section class="np-search-bar">
    <button type="button"
            class="np-search-bar__toggle-list-view"
            @click="changeFoodListView">
      <ListIcon />
    </button>

    <div class="np-search-bar__input">
      <SearchIcon class="np-search-bar__input-icon" />

      <input class="np-search-bar__input-el"
             type="search"
             placeholder="Search"
             v-model="filterVal"
             />
    </div>

    <section class="np-search-bar__filter">
      <div class="np-search-bar__filter-option"
           @click="toggleOrderList">
        <SwitchIcon class="np-search-bar__filter-option-icon"/>

        <p class="np-search-bar__filter-option-text">
          <span>{{orderVal.category}}: </span>{{orderVal.order}}
        </p>

        <button class="np-search-bar__filter-option-btn"
                :class="isLiActive ? 'np-search-bar__filter-option-btn--active' : ''">

          <DownArrowIcon />
        </button>
      </div>
      <ul class="np-search-bar__filter-list"
          :class="isLiActive ? 'np-search-bar__filter-list--active' : ''"
          @click="setFoodOrder">

        <li class="np-search-bar__filter-list-item"
            v-for="option in orderOptions"
            :id="option.type"
            :key="option.type">
          <span>{{option.category}} </span> {{option.order}}
        </li>
      </ul>
    </section>

  </section>
</template>

<script lang="ts">
import ListIcon from "@/assets/icons/icon-list.vue";
import DownArrowIcon from "@/assets/icons/icon-down-arrow.vue";
import SearchIcon from "@/assets/icons/icon-search.vue";
import SwitchIcon from "@/assets/icons/icon-switch.vue";

import { computed, defineComponent, ref } from "vue";
import {useStore} from "@/store/index";
import {OrderOption} from "@/store/navigationInterface";



export default defineComponent({
  components: {
    ListIcon,
    DownArrowIcon,
    SearchIcon,
    SwitchIcon
  },
  setup(props: any) {
    const store = useStore();

    const isLiActive = ref<any>(false);
    const filterVal = ref("");
    const orderVal = ref<any>(computed(() => store.state.nav.foodListOrder));
    const orderOptions: OrderOption[] = [
      {
        category: "Price",
        order: "Low to High",
        type: "price_asc"
      },
      {
        category: "Price",
        order: "High to Low",
        type: "price_desc"
      },
      {
        category: "Alphabetically",
        order: "A to Z",
        type: "alph_asc"
      },
      {
        category: "Alphabetically",
        order: "Z to A",
        type: "alph_desc"
      }
    ];

    const changeFoodListView = function(): void {
      store.commit("nav/toggleFoodListView")
    };
    const toggleOrderList = function(): void {
      isLiActive.value = !isLiActive.value;
    };

    const setFoodOrder = function(event: any): void{
      const id = event.target.closest(".np-search-bar__filter-list-item").id;
      const activeOrder = orderOptions.filter((option: OrderOption) => option.type === id);
      store.commit("nav/setFoodListOrder", activeOrder[0]);
      store.commit("nav/orderFoodList");
      toggleOrderList();
    };

    const setActiveFilter = function(): void {
      store.commit("nav/filterFoodList", filterVal.value);
      store.commit("nav/")
    };

    return {
      changeFoodListView,
      setActiveFilter,
      setFoodOrder,
      toggleOrderList,
      filterVal,
      orderVal,
      orderOptions,
      isLiActive
    };
  },
});
</script>

<style lang="scss" scoped>
.np-search-bar {
  @apply flex flex-row justify-start items-center w-full mb-10;
  height: 56px;
  background-color: #ffffff;

  svg {
    height: inherit;
    width: auto;
    fill: theme("colors.secondary.DEFAULT");
  }

  &__toggle-list-view {
    height: inherit;
    outline: none;

    svg {
      padding: 10px 20px 10px 0;

      &:hover {
        fill: theme("colors.primary.DEFAULT");
      }
    }
  }

  &__input,&__filter{
    height: inherit;
    margin-left: 44px;
    border-radius: 2px;
    border: solid 1px theme("colors.secondary.lighter");
  }

  &__input {
    @apply flex flex-row justify-start items-center w-full;

    height: inherit;
    padding: 10px;

    &:hover {
      border-color: theme("colors.primary.DEFAULT");
    }

    &-el {
      width: 100%;
      font-size: 19px;
      outline: none;
      color: theme("colors.secondary.dark");
    }
    svg {
      height: 36px;
      margin-right: 20px;
    }
  }

  &__filter {
    width: 300px;
    height: inherit;

    &:hover {
      border-color: theme("colors.primary.DEFAULT");
    }

    &-option {
      @apply flex flex-row justify-between items-center;

      height: inherit;
      width: inherit;
      padding: 16px;

      cursor: pointer;

      svg {
        fill: theme("colors.secondary.dark");
        width: 30px;
      }

      &-text {
        width: 100%;
        margin: 0 10px;

        font-size: 19px;
        text-align: left;
        color: theme("colors.secondary.DEFAULT");

        span {
          color: theme("colors.secondary.dark");
        }
      }

      &-icon {
        transform: rotate(90deg);
      }

      &-btn {
        outline: none;

        &--active {
          transform: rotate(180deg);
        }

        svg {
          width: 15px;
        }
      }
    }
    &-list {
      width: inherit;
      display: none;
      background-color: #ffffff;

      &--active {
        @apply block absolute z-10 ;
        border: solid 1px theme("colors.secondary.lighter");
      }
      &-item {
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: theme("colors.secondary.DEFAULT");

        cursor: pointer;
        border: solid 1px theme("colors.secondary.lighter");

        &:hover {
          color: theme("colors.secondary.darker");
          border-color: theme("colors.secondary.darker");

        }
      }
    }
  }
}
</style>
