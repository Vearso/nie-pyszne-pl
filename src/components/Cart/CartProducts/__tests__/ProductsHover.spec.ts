import { shallowMount } from "@vue/test-utils";
import mockCart from "@/store/mockModules/mockCart";
import mockModal from "@/store/mockModules/mockModal";
import { createStore } from "vuex";
import ProductsHover from "@/components/Cart/CartProducts/ProductsHover.vue";
import { key } from "@/store";

const cart = {
  state: {
    items: [],
    currentPage: 1,
    pagesCount: 0,
    itemsPerPage: 3,
    paginatedItems: [],
    priceTotal: 0
  },
  ...mockCart
};
const modal = {
  state: {
    showModal: false,
    itemToDelete: null
  },
  ...mockModal
};

const store = createStore({ modules: { cart, modal } });

function factory() {
  return shallowMount(ProductsHover, {
    props: {
      item: {
        id: 0,
        name: "Pepperoni",
        quantity: 3,
        price: 9,
        imgUrl:
          "https://images.unsplash.com/photo-1542282811-943ef1a977c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        isHoveredOn: false
      }
    },
    global: {
      plugins: [[store, key]]
    }
  });
}

describe("Products Hover tests", () => {
  const wrapper = factory();
  it("renders", () => {
    expect(wrapper.html()).toContain("np-productsHover");
  });
  it("Clicking minus sign commits decrement quantity", async () => {
    await wrapper
      .find(".np-productsHover__actions>:first-child")
      .trigger("click");
    expect(cart.mutations.decrementQuantity).toHaveBeenCalled();
  });
  it("Clicking plus sign commits increment quantity", async () => {
    await wrapper
      .find(".np-productsHover__actions>:last-child")
      .trigger("click");
    expect(cart.mutations.incrementQuantity).toHaveBeenCalled();
  });
  it("Displays right quantity", () => {
    const quantity = wrapper.find(".np-productsHover__actions>:nth-child(2)");
    expect(quantity.text()).toBe("3");
  });
  it("Clicking on cross commits pop modal", async () => {
    await wrapper.find(".np-productsHover__cross").trigger("click");
    expect(modal.mutations.popModal).toHaveBeenCalled();
  });
});
