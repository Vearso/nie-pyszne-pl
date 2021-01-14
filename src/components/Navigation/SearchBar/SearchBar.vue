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
             v-model="inputVal"/>

    </div>

    <section class="np-search-bar__filter">
      <div class="np-search-bar__filter-option"
           @click="toggleFilterList">
        <SwitchIcon class="np-search-bar__filter-option-icon"/>

        <p class="np-search-bar__filter-option-text"><span>Option: </span>details</p>

        <button class="np-search-bar__filter-option-btn"
                :class="isLiActive ? 'np-search-bar__filter-option-btn--active' : ''">

          <DownArrowIcon />
        </button>
      </div>
      <ul class="np-search-bar__filter-list"
          :class="isLiActive ? 'np-search-bar__filter-list--active' : ''"
          @click="setActiveFilter">

        <li class="np-search-bar__filter-list-item"><span>Price </span>Low to High</li>
        <li class="np-search-bar__filter-list-item"><span>Price </span>High to Low</li>
        <li class="np-search-bar__filter-list-item"><span>Alphabetically </span>A to Z</li>
        <li class="np-search-bar__filter-list-item"><span>Alphabetically </span>Z to A</li>
      </ul>
    </section>

  </section>
</template>

<script lang="ts">

import ListIcon from "@/assets/icons/icon-list.vue";
import DownArrowIcon from "@/assets/icons/icon-down-arrow.vue";
import SearchIcon from "@/assets/icons/icon-search.vue";
import SwitchIcon from "@/assets/icons/icon-switch.vue";

import { defineComponent, ref } from "vue";
import {useStore} from "@/store/index";

export default defineComponent({
  components: {
    ListIcon,
    DownArrowIcon,
    SearchIcon,
    SwitchIcon
  },
  props: {
    isListActive: {
      type: Boolean,
      default: false
    },
  },
  setup(props: any) {
    const store = useStore();

    const isLiActive = ref<typeof props.isListActive>(false);
    const inputVal = ref("");
    const changeFoodListView = function() {
      store.commit("nav/toggleFoodListView")
      return true
    };
    const setActiveFilter = function() {
      store.commit("nav/filterFoodList", inputVal);
      return true;
    };
    const toggleFilterList = function() {
      isLiActive.value = !isLiActive.value;
    };

    return {
      changeFoodListView,
      setActiveFilter,
      toggleFilterList,
      isLiActive,
      inputVal
    };
  },
});
</script>

<style lang="scss" scoped>
.np-search-bar {
  @apply flex flex-row justify-start items-center w-full;
  height: 56px;

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
          //height: auto;
        }
      }
    }
    &-list {
      width: inherit;
      display: none;

      &--active {
        @apply block absolute;

        border: solid 1px theme("colors.secondary.lighter");
      }
      &-item {
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: theme("colors.secondary.lighter");

        cursor: pointer;
        border: solid 1px theme("colors.secondary.lighter");

        &:hover {
          color: theme("colors.secondary.darker");
        }
      }
    }
  }
}
</style>
