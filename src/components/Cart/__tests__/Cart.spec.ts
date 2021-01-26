import { mount } from "@vue/test-utils";
import Cart from "../Cart.vue";
import { createStore } from "vuex";
import sideMenu from "@/store/modules/sideMenu";
import { key } from "@/store";

const createVuexStore = (): any => createStore({ modules: { sideMenu } });

function factory() {
  const store = createVuexStore();
  return mount(Cart, {
    global: {
      plugins: [[store, key]],
      stubs: {
        User: true,
        Steps: true,
        CartProducts: true,
        CartForm: true,
        Summary: true
      }
    }
  });
}

describe("Cart", () => {
  it("rendersClosed", () => {
    const wrapper = factory();
    expect(wrapper.attributes("class")).toBe("np-cart--closed");
  });
  it("opens", async () => {
    const wrapper = factory();
    await wrapper.find(".np-cart__arrow__container").trigger("click");
    expect(wrapper.attributes("class")).toBe("np-cart--opened");
  });
  it("renders user component", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain("<user-stub>");
  });
  it("renders steps component", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain("<steps-stub>");
  });
  it("renders cart products component", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain("<cart-products-stub>");
  });
  it("closes", async () => {
    const wrapper = factory();
    await wrapper.find(".np-cart__arrow__container").trigger("click");
    expect(wrapper.attributes("class")).toBe("np-cart--closed");
  });
});
