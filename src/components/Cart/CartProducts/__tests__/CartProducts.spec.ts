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
    props: {},
    global: {
      plugins: [[store, key], [i18n]]
    }
  });
}

describe("Cart Products", () => {
  it("renders empty", () => {
    const wrapper = factory();
    console.log(wrapper.html());
    expect(wrapper.html()).toContain("np-cartProducts--empty");
  });
  it("renders with items", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain("np-cartProducts__item");
  });
  it("hover renders product hover", async () => {
    const wrapper = factory();
    await wrapper.find(".np-cartProducts__item").trigger("mouseover");
    expect(wrapper.find(".np-cartProducts__item").html()).toContain(
      "products-hover-stub"
    );
  });
  it("hover off renders product details", async () => {
    const wrapper = factory();
    await wrapper.find(".np-cartProducts__item").trigger("mouseover");
    await wrapper.find(".np-cartProducts__item").trigger("mouseleave");
    expect(wrapper.find(".np-cartProducts__item").html()).toContain(
      "products-details-stub"
    );
  });
  it("renders buttons", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain("buttons-stub");
  });
  it("calculates right price", () => {
    const wrapper = factory();
    expect(
      wrapper.find(".np-cartProducts__item__price p:last-child").text()
    ).toBe("$0.00");
  });
  it("pagination works", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");
    await wrapper.find(".pagination__arrow--right").trigger("click");
    await wrapper.find(".pagination__arrow--left").trigger("click");
    await input.setValue("1");
  });
});
