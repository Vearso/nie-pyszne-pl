<template>
  <ul class="np-category-list">
    <li class="np-category-list__item"
        v-for="category in categories"
        @click="setActiveCategory"
        :id="category.type"
        :class="activeCategory === category.type ? 'np-category-list__item--active' : ''"
        :key="category.name">

      <img class="np-category-list__item-icon"
           :src="category.src"
           :alt="altText(category.name)" />

      <span class="np-category-active">{{ category.name }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import {ref} from "vue";

export default {
  props: {
    categories: {
      type: Array
    },
    activeCat: {
      type: String,
      default: "all"
    //  zrobić default all z ikoną restauracji to będzie pokazywać wszystkie opcje
    }
  },
  setup(props: any){
    const activeCategory = ref(props.activeCat);
    return {
      activeCategory
    }
  },
  methods:{
    altText(name: string):string {
      return name + " icon";
    },
    setActiveCategory(){
      return true
    }
  }
};
</script>

<style lang="scss" scoped>
.np-category-list{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 60px;

  margin-bottom: 40px;

  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;

    color: theme("colors.secondary.DEFAULT");
    font-size: 18px;
    margin-right: 20px;

    cursor: pointer;

    &:hover{
      color: theme('colors.secondary.darker');

      svg {
        fill: theme('colors.secondary.darker');
      }
    }
    &:last-child{
      margin-right: 0;
    }

    svg {
      height: inherit;
      width: auto;
      fill: theme("colors.secondary.DEFAULT");
    }
    &--active {
      color: theme("colors.primary.DEFAULT");
      border-bottom: 3px solid theme("colors.primary.DEFAULT");
      font-weight: bold;

      svg {
        fill: theme("colors.primary.DEFAULT");
      }

      &:hover{
        color: theme('colors.primary.DEFAULT');

        svg {
          fill: theme('colors.primary.DEFAULT');
        }
      }
    }
  }
}
</style>
