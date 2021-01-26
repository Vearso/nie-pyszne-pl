import { mount } from "@vue/test-utils";
import ProductsDetails from "../ProductsDetails.vue";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

function factory(name = "Pepperoni"): any {
  return mount(ProductsDetails as any, {
    props: {
      item: {
        id: 0,
        name,
        quantity: 3,
        price: 9,
        imgUrl:
          "https://images.unsplash.com/photo-1542282811-943ef1a977c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        isHoveredOn: false
      }
    },
    shallow: true,
    global: {
      plugins: [i18n]
    }
  });
}

describe("Products details", () => {
  const wrapper = factory();
  it("renders details", () => {
    expect(wrapper.html()).toContain("np-productsDetails");
  });
  it("displays right quantity", () => {
    const quantity = wrapper.find(".np-productsDetails__quantity");
    expect(quantity.text()).toContain("3");
  });
  it("displays right price", () => {
    const price = wrapper.find(".np-productsDetails__price");
    expect(price.text()).toBe("$27");
  });
  it("displays full name if under 20 signs", () => {
    const name = wrapper.find(".np-productsDetails__name");
    expect(name.text()).toBe("PEPPERONI");
  });
  it("cuts name with ...", () => {
    const wrapper = factory("Very long name having so much length");
    const name = wrapper.find(".np-productsDetails__name");
    expect(name.text()).toContain("..");
  });
});
