import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import { key } from "@/store";
import ProductsListItem from "@/components/Products/ProductsListItem.vue";

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
  store.dispatch = jest.fn();
  return mount(component, {
    global: {
      plugins: [i18n, [store, key]]
    },
    ...options
  });
};

describe("Product List Item", () => {
  const wrapper = createWrapper(
    ProductsListItem,
    {},
    {
      props: {
        id: 0,
        name: "xxx",
        type: "yyy",
        price: 10,
        imgUrl: "xxx",
        rating: 4
      }
    }
  );
  it("renders product", () => {
    expect(wrapper.find(".product-list-item__description__title").text()).toBe(
      "xxx"
    );
    expect(wrapper.find(".product-list-item__description__price").text()).toBe(
      "$10"
    );
    expect(
      wrapper
        .find(".product-list-item__rating")
        .find("span")
        .text()
    ).toBe("4");
    expect(
      wrapper.find(".product-list-item__picture").attributes("style")
    ).toBe(`background-image: url(xxx);`);
  });
});
