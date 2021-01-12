<template>
  <div class="product-list-item">
    <div
        class="product-list-item__picture"
        v-bind:style="{ backgroundImage: 'url(' + imgUrl + ')' }"
    ></div>
    <div class="product-list-item__description">
      <span class="product-list-item__description__title">{{ title }} </span>
      <span class="product-list-item__description__price">${{ price }}</span>
    </div>
    <div class="product-list-item__rating">
      <img src="../../assets/star.png" /> {{ rate }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProductsListItem",
  props: {
    title: String,
    price: Number,
    imgUrl: String,
    rate: Number
  }
};
</script>

<style lang="scss" scoped>
.product-list-item {
  position: relative;
  height: 16rem;
  margin: 10px;
  font-size: 21px;

  display: grid;
  grid-template-rows: 12rem 1fr;

  &__rating {
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0 15px 0;
    right: 0;
    height: 50px;
    width: 80px;
    background-color: white;
    color: #000;
    font-weight: bold;
  }

  &__picture {
    border-radius: 2rem 0 2rem 0;
    filter: contrast(0.5);
    background-size: contain;
  }

  &__description {
    display: flex;
    justify-content: space-between;
    padding: 17px 7px;
    font-weight: bold;
    border: 1px solid #efefee;
    border-top: none;
    box-sizing: border-box;

    &__title {
      display: inline-block;
      text-transform: uppercase;
      color: theme("colors.secondary.light");
    }

    &__price {
      color: theme("colors.primary.DEFAULT");
    }
  }

  &:hover {
    box-shadow: 4px 4px 3px 0 rgba(71, 61, 86, 0.1);
    cursor: pointer;

    :first-child {
      color: theme("colors.secondary.dark");
      filter: contrast(1);
    }
  }
}
</style>
