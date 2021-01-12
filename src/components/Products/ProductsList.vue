<template>
  <div class="product-list">
    <products-list-item
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :price="item.price"
      :imgUrl="item.imgUrl"
      :rate="item.rate"
    >
    </products-list-item>
  </div>
</template>

<script lang="ts">
import ProductsListItem from "@/components/Products/ProductsListItem.vue";

export default {
  name: "ProductsList",
  data() {
    return {
      items: [
        {
          title: "quatrro",
          price: 15,
          rate: 5.5,
          imgUrl:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          title: "quatrro",
          price: 15,
          rate: 4.5,
          imgUrl:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          title: "quatrro",
          price: 15,
          rate: 3.5,
          imgUrl:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          title: "quatrro",
          price: 15,
          rate: 4.5,
          imgUrl:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          title: "quatrro",
          price: 15,
          rate: 4.5,
          imgUrl:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          title: "quatrro",
          price: 15,
          rate: 4.5,
          imgUrl:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        }
      ]
    };
  },
  components: {
    ProductsListItem
  }
};
</script>

<style lang="scss" scoped>
.product-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 0 auto;
}
</style>
