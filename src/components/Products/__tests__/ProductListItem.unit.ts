import { shallowMount } from "@vue/test-utils";
import ProductsListItem from "@/components/Products/ProductsListItem.vue";

describe("productListItem", () => {
  it("renders productListItem", () => {
    const wrapper = shallowMount(ProductsListItem, {
      props: {
        id: "id",
        name: "Pizza",
        type: "pizza",
        price: 9,
        imgUrl: "google.com",
        rating: 5
      }
    });

    expect(wrapper.html()).toBeDefined();
  });
});
