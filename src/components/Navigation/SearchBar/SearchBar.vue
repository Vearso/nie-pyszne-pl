<template>
  <section class="np-search-bar">
    <button type="button"
            class="np-search-bar__toggle-list-view"
            @click="changeListView">
      <icon-base icon-name="list" class-name="np-search-bar__list-view-icon">
        <ListIcon />
      </icon-base>
<!--      <svg enable-background="new 0 0 24 24"-->
<!--           height="100" viewBox="0 0 24 24" width="100" xmlns="http://www.w3.org/2000/svg"><path d="m5 0h-4c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h4c.552 0 1-.448 1-1v-4c0-.552-.448-1-1-1z"/><path d="m23 0h-14c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-4c0-.552-.448-1-1-1z"/><path d="m5 9h-4c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h4c.552 0 1-.448 1-1v-4c0-.552-.448-1-1-1z"/><path d="m23 9h-14c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-4c0-.552-.448-1-1-1z"/><path d="m5 18h-4c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h4c.552 0 1-.448 1-1v-4c0-.552-.448-1-1-1z"/><path d="m23 18h-14c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-4c0-.552-.448-1-1-1z"/></svg>-->
    </button>

    <div class="np-search-bar__input">
<!--      <icon-base icon-name="search" class-name="np-search-bar">-->
<!--        <SearchIcon />-->
<!--      </icon-base>-->
      <svg class="np-search-bar__input-icon"
           xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 512.005 512.005" style="enable-background:new 0 0 512.005 512.005;" xml:space="preserve">
          <g>
            <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
              S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
              c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
               M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"/>
          </g>
        </svg>

      <input class="np-search-bar__input-el"
             type="search"
             placeholder="Search"
             v-model="inputVal"/>

    </div>

    <section class="np-search-bar__filter">
      <div class="np-search-bar__filter-option"
           @click="toggleFilterList">

        <svg class="np-search-bar__filter-option-icon"
             id="Layer"
             enable-background="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m10 26h39.172l-3.586 3.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l7-7c.781-.781.781-2.047 0-2.828l-7-7c-.781-.781-2.047-.781-2.828 0s-.781 2.047 0 2.828l3.586 3.586h-39.172c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 38h-39.172l3.586-3.586c.781-.781.781-2.047 0-2.828-.78-.781-2.048-.781-2.828 0l-7 7c-.781.781-.781 2.047 0 2.828l7 7c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-3.586-3.586h39.172c1.104 0 2-.896 2-2s-.896-2-2-2z"/>
        </svg>

        <p class="np-search-bar__filter-option-text"><span>Option: </span>details</p>

        <button class="np-search-bar__filter-option-btn"
                :class="isLiActive ? 'np-search-bar__filter-option-btn--active' : ''">

          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               viewBox="0 0 213.333 213.333" style="enable-background:new 0 0 213.333 213.333;" xml:space="preserve">
            <g>
              <polygon points="0,53.333 106.667,160 213.333,53.333 		"/>
            </g>

          </svg>
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
import IconBase from "@/assets/IconBase.vue";
import ListIcon from "@/assets/icons/list.vue";
// import SearchIcon from "@/assets/icons/loupe.vue";

import { defineComponent, ref } from "vue";
import {useStore} from "vuex";

export default defineComponent({
  props: {
    inputValue: {
      type: String,
      default: ""
    },
    isListActive: {
      type: Boolean,
      default: false
    },
  },
  setup(props: any) {
    // const store = useStore();

    const isLiActive = ref<typeof props.isListActive>(props.isListActive);
    const inputVal = ref(props.inputValue);

    const changeListView = function() {
      return true;
    };
    const setActiveFilter = function() {
      return true;
    };
    const toggleFilterList = function() {
      isLiActive.value = !isLiActive.value;
    };

    return {
      changeListView,
      setActiveFilter,
      toggleFilterList,
      isLiActive,
      inputVal
    };
  },
  components: {
    IconBase,
    ListIcon,
    // SearchIcon
  }
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
