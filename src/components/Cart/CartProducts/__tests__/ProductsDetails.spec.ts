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

function factory(): any {
  return mount(ProductsDetails as any, {
    props: {
      item: {
        id: 0,
        name: "Pizza Pepperoni",
        quantity: 1,
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
  it("renders details", () => {
    const wrapper = factory();
    console.log(wrapper.html());
  });
});
