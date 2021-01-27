import { shallowMount } from "@vue/test-utils";
import mockSideMenu from "@/store/mockModules/mockSideMenu";
import { createStore } from "vuex";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import Steps from "@/components/Cart/Steps/Steps.vue";
import { key } from "@/store";

const sideMenu = {
  state: {
    menuOpened: false,
    step: 2
  },
  ...mockSideMenu
};

const store = createStore({ modules: { sideMenu } });

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

function factory() {
  return shallowMount(Steps, {
    global: {
      plugins: [[store, key], [i18n]]
    }
  });
}

describe("Steps tests", () => {
  const wrapper = factory();
  it("Renders", () => {
    expect(wrapper.html()).toContain("np-steps");
  });
  it("Elements have correct classes", () => {
    const stepOne = wrapper.find(".np-steps__wrapper:first-child");
    const stepTwo = wrapper.find(".np-steps__wrapper:nth-child(2)");
    const stepThree = wrapper.find(".np-steps__wrapper:last-child");
    expect(stepOne.html()).toContain("completed");
    expect(stepTwo.html()).toContain("active");
    expect(stepThree.html()).toContain("waiting");
  });
  it("Clicking first steps commits prev page", async () => {
    const stepOne = wrapper.find(".np-steps__wrapper:first-child");
    await stepOne.trigger("click");
    expect(sideMenu.mutations.prevStep).toHaveBeenCalled();
  });
});
