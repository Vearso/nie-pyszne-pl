import { mount, shallowMount } from "@vue/test-utils";
import mockUser from "@/store/mockModules/mockUser";
import { createStore } from "vuex";
import SignIn from "@/components/Cart/User/SignIn.vue";
import { key } from "@/store";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import { ROUTE_HOME, ROUTE_SIGNIN, ROUTE_SIGNUP } from "@/router";

const user = {
  state: {},
  ...mockUser
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});
const routes = [
  {
    path: "/",
    ...ROUTE_HOME,
    component: Home
  },
  {
    path: "/signIn",
    ...ROUTE_SIGNIN,
    component: () => import("@/components/Cart/User/SignIn.vue")
  },
  {
    path: "/signUp",
    ...ROUTE_SIGNUP,
    component: () => import("@/components/Cart/User/SignUp.vue")
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const store = createStore({ modules: { user } });

function factory(mocks = {}) {
  return mount(SignIn, {
    global: {
      plugins: [[store, key], [i18n], [router]],
      mocks: {
        ...mocks
      }
    }
  });
}

describe("Sign in tests", () => {
  it("renders", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain("np-sign-in");
  });
  it("Return triggers goBack", async () => {
    const goBack = jest.fn();
    const wrapper = factory({ goBack });
    await wrapper.find(".np-sign-in__button:nth-child(2)").trigger("click");
    expect(goBack).toHaveBeenCalled();
  });
  it("Router link changes to anchor", async () => {
    const wrapper = factory();
    const router = wrapper.find("strong");
    expect(router.html()).toContain("a");
  });
});
