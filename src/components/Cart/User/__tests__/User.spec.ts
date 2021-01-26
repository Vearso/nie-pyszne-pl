import { shallowMount } from "@vue/test-utils";
import mockUser from "@/store/mockModules/mockUser";
import { createStore } from "vuex";
import { createI18n } from "vue-i18n";
import messages from "@/locales/en";
import { ROUTE_HOME, ROUTE_SIGNIN, ROUTE_SIGNUP } from "@/router";
import Home from "@/views/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import User from "@/components/Cart/User/User.vue";
import { key } from "@/store";

const user = {
  state: {
    name: "John Kowalsky"
  },
  ...mockUser
};
const store = createStore({ modules: { user } });
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

function factory() {
  return shallowMount(User, {
    global: {
      plugins: [[store, key], [i18n], [router]]
    }
  });
}

describe("User tests", () => {
  it("renders", () => {
    const wrapper = factory();
    expect(wrapper.html()).toContain("np-cart__user");
  });
  it("Click dispatches action to sign out", async () => {
    const wrapper = factory();
    const button = wrapper.find("a");
    await button.trigger("click");
    expect(user.actions.doSignOut).toHaveBeenCalled();
  });
});
