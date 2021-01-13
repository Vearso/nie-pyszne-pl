<template>
  <div
    class="product-list"
    v-if="items.length"
    :style="[
      false
        ? 'grid-template-columns: 1fr'
        : 'grid-template-columns: 1fr 1fr 1fr'
    ]"
  >
    <products-list-item
      v-for="item in items"
      :key="item.id"
      :name="item.name"
      :price="item.price"
      :imgUrl="item.imgUrl"
      :rate="item.rate"
      @click="addToCart(item)"
    >
    </products-list-item>
  </div>
</template>

<script lang="ts">
import ProductsListItem from "@/components/Products/ProductsListItem.vue";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";

const ProductsList = defineComponent({
  name: "ProductsList",
  data() {
    return {
      items: [
        {
          id: 0,
          name: "quatrrrrrrrrrrrrrrrrrrrrrrrrrrrro",
          type: "pizza",
          price: 15,
          rating: 5.5,
          imgUrl:
              "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          id: 1,
          name: "quatrro",
          type: "pizza",
          price: 15,
          rating: 5.5,
          imgUrl:
              "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          id: 0,
          name: "quatrro",
          type: "pizza",
          price: 15,
          rating: 5.5,
          imgUrl:
              "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          id: 0,
          name: "quatrro",
          type: "pizza",
          price: 15,
          rating: 5.5,
          imgUrl:
              "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          id: 0,
          name: "quatrro",
          type: "pizza",
          price: 15,
          rating: 5.5,
          imgUrl:
              "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          id: 0,
          name: "quatrro",
          type: "pizza",
          price: 15,
          rating: 5.5,
          imgUrl:
              "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        }
      ]
    };
  },
  components: {
    ProductsListItem
  },
  methods: {
    ...mapMutations("cart", ["addToCart"])
  }
});
export default ProductsList;
</script>

<style lang="scss" scoped>
.product-list {
  display: grid;
  width: 100%;
  margin: 0 auto;
}
</style>
