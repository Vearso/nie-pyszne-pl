import { mount, shallowMount } from "@vue/test-utils";
import mockTime from "@/store/mockModules/mockTime";
import mockCart from "@/store/mockModules/mockCart";
import mockSideMenu from "@/store/mockModules/mockSideMenu";
import { createStore } from "vuex";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import Summary from "@/components/Cart/Summary/Summary.vue";
import { key } from "@/store";
import { nextTick } from "vue";

const time = {
  state: {
    time: 0,
    calculatedTime: {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },
  ...mockTime
};
const cart = {
  state: {},
  ...mockCart
};
const sideMenu = {
  state: {},
  ...mockSideMenu
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

const store = createStore({ modules: { cart, time, sideMenu } });

function factory() {
  return shallowMount(Summary, {
    global: {
      plugins: [[store, key], [i18n]]
    }
  });
}

describe("Summary tests", () => {
  const wrapper = factory();
  it("renders", () => {
    expect(wrapper.html()).toContain("np-Summary");
  });
  it("displays title", () => {
    const title = wrapper.find(".np-Summary__title");
    expect(title.text()).toBe("Your order is being processed!");
  });
  it("displays right time", () => {
    const time = wrapper.find(".np-Summary__time");
    expect(time.text()).toBe("TIME: 00:00");
  });
  it("Mounting commits mutations and dispatch actions", () => {
    expect(time.mutations.setTime).toHaveBeenCalled();
    expect(time.mutations.calculateTime).toHaveBeenCalled();
    expect(time.actions.countDown).toHaveBeenCalled();
  });
  // Can't test watch because of lack support to the composition API
});
