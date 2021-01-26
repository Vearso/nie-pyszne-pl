import { mount, VueWrapper } from "@vue/test-utils";
import ProductsList from "@/components/Products/ProductsList.vue";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import { createStore } from "vuex";
import nav from "@/store/modules/navigation";
import cart from "@/store/modules/cart";
import { key } from "@/store";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

const createWrapper = (component: any, modules = {}, options = {}) => {
  const store = createStore({
    modules: {
      ...modules
    }
  });
  return mount(component, {
    global: {
      plugins: [i18n, [store, key]]
    },
    ...options
  });
};

describe("Products list", () => {
  it("renders products list when there are products", () => {
    const wrapper = createWrapper(ProductsList, {
      cart,
      nav,
      products: { state: { products: [1, 2, 3] } }
    });
    expect(wrapper.findComponent({ name: "products-list-item" }).exists()).toBe(
      true
    );
  });
  it("renders pagination when there is more pages than 1", () => {
    const wrapper = createWrapper(ProductsList, {
      cart,
      nav,
      products: { state: { numberOfPages: 2 } }
    });
    expect(wrapper.findComponent({ name: "list-pagination" }).exists()).toBe(
      true
    );
  });
  it("does not render products list when there are no products", () => {
    const wrapper = createWrapper(ProductsList, {
      cart,
      nav,
      products: { state: { products: [] } }
    });
    expect(wrapper.findComponent({ name: "products-list-item" }).exists()).toBe(
      false
    );
  });
  it("does not render pagination when there is less pages than 2", () => {
    const wrapper = createWrapper(ProductsList, {
      cart,
      nav,
      products: { state: { numberOfPages: 1 } }
    });
    expect(wrapper.findComponent({ name: "list-pagination" }).exists()).toBe(
      false
    );
  });
});
