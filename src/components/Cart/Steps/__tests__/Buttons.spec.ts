import { shallowMount } from "@vue/test-utils";
import mockCart from "@/store/mockModules/mockCart";
import mockSideMenu from "@/store/mockModules/mockSideMenu";
import { createStore } from "vuex";
import Buttons from "@/components/Cart/Steps/Buttons.vue";
import { key } from "@/store";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";

const cart = {
  state: {
    priceTotal: 12
  },
  ...mockCart
};
const sideMenu = {
  state: {
    menuOpened: false,
    step: 1
  },
  ...mockSideMenu
};
const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

const storeStep1 = createStore({ modules: { cart, sideMenu } });
const storeStep2 = createStore({
  modules: {
    cart,
    sideMenu: {
      ...sideMenu,
      state: {
        ...sideMenu.state,
        step: 2
      }
    }
  }
});
const storeStep3 = createStore({
  modules: {
    cart,
    sideMenu: {
      ...sideMenu,
      state: {
        ...sideMenu.state,
        step: 3
      }
    }
  }
});
function factory(store: any = storeStep1) {
  return shallowMount(Buttons, {
    props: {},
    global: {
      plugins: [[store, key], [i18n]]
    }
  });
}

describe("Buttons tests", () => {
  const wrapper = factory();

  it("Renders", () => {
    expect(wrapper.html()).toContain("np-cart__buttons");
  });
  it("Clicking next commits next page", async () => {
    await wrapper.find(".np-cart__buttons__button").trigger("click");
    expect(sideMenu.mutations.nextStep).toHaveBeenCalled();
  });
  it("Renders second step", () => {
    const wrapper = factory(storeStep2);
    expect(wrapper.html()).toContain("Previous");
  });
  it("Clicking previous commits previous page", async () => {
    const wrapper = factory(storeStep2);
    await wrapper.find(".np-cart__buttons__button:last-child").trigger("click");
    expect(sideMenu.mutations.prevStep).toHaveBeenCalled();
  });
  it("Renders third step", () => {
    const wrapper = factory(storeStep3);
    expect(wrapper.html()).toContain("Add new order");
  });
  it("Clicking add new order commits reset order", async () => {
    const wrapper = factory(storeStep3);
    await wrapper.find(".np-cart__buttons__button").trigger("click");
    expect(sideMenu.mutations.resetOrder).toHaveBeenCalled();
    expect(cart.mutations.clearCart).toHaveBeenCalled();
  });
});
