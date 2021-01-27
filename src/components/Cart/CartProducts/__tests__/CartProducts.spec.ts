import { shallowMount } from "@vue/test-utils";
import CartProducts from "../CartProducts.vue";
import { createStore } from "vuex";
import { key } from "@/store";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import mockCart from "@/store/mockModules/mockCart";

const cart = {
  state: {
    items: [
      {
        id: 1,
        name: "Test item",
        quantity: 2,
        price: 12,
        imgUrl: "",
        isHoveredOn: false
      }
    ],
    currentPage: 1,
    pagesCount: 2,
    itemsPerPage: 3,
    paginatedItems: [
      [
        {
          id: 1,
          name: "Test item",
          quantity: 2,
          price: 12,
          imgUrl: "",
          isHoveredOn: false
        },
        {
          id: 1,
          name: "Test item",
          quantity: 2,
          price: 12,
          imgUrl: "",
          isHoveredOn: false
        }
      ]
    ],
    priceTotal: 24
  },
  ...mockCart
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

const store = createStore({
  modules: { cart }
});

function factory(): any {
  return shallowMount(CartProducts as any, {
    props: {
      isFormValid: true
    },
    global: {
      plugins: [[store, key], [i18n]]
    }
  });
}

describe("Cart Products", () => {
  const wrapper = factory();
  it("renders empty", () => {
    const emptyStore = createStore({
      modules: {
        cart: {
          ...cart,
          state: {
            ...cart.state,
            paginatedItems: []
          }
        }
      }
    });
    const wrapper = shallowMount(CartProducts, {
      global: {
        plugins: [[emptyStore, key], [i18n]]
      }
    });
    expect(wrapper.html()).toContain("np-cartProducts--empty");
  });
  it("renders with items", () => {
    expect(wrapper.html()).toContain("np-cartProducts__item");
  });
  it("Hover on commits turnHoverOn", async () => {
    await wrapper.find(".np-cartProducts__item").trigger("mouseover");
    expect(cart.mutations.turnHoverOn).toHaveBeenCalled();
  });
  it("hover off commits turnHoverOff", async () => {
    await wrapper.find(".np-cartProducts__item").trigger("mouseover");
    await wrapper.find(".np-cartProducts__item").trigger("mouseleave");
    expect(cart.mutations.turnHoverOff).toHaveBeenCalled();
  });
  it("renders buttons", () => {
    expect(wrapper.html()).toContain("buttons-stub");
  });
  it("displays right price", () => {
    expect(
      wrapper.find(".np-cartProducts__item__price p:last-child").text()
    ).toBe("$24.00");
  });
  it("Clicking right arrow commits next page", async () => {
    await wrapper.find(".pagination__arrow--right").trigger("click");
    expect(cart.mutations.nextPage).toHaveBeenCalled();
  });
  it("Clicking left arrow commits prev page", async () => {
    await wrapper.find(".pagination__arrow--left").trigger("click");
    expect(cart.mutations.prevPage).toHaveBeenCalled();
  });
  it("Change of input for pagination commits set page", async () => {
    const input = wrapper.find("input");
    await input.trigger("change");
    expect(cart.mutations.setPage).toHaveBeenCalled();
  });
});
