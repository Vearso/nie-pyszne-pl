import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import { key } from "@/store";
import SignUp from "@/components/Cart/User/SignUp.vue";
import * as VeeValidate from "vee-validate";
import user from "@/store/modules/user";
import { Component } from "vue-property-decorator";

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

describe("Sign up ", () => {
  const wrapper = createWrapper(SignUp, { user });
  it("renders child components", () => {
    expect(wrapper.findComponent(VeeValidate.Form).exists()).toBe(true);
    expect(wrapper.findComponent(VeeValidate.Field).exists()).toBe(true);
    expect(wrapper.findComponent(VeeValidate.ErrorMessage).exists()).toBe(true);
  });
});
