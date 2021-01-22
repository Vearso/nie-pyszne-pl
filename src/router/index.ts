import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

export const ROUTE_SIGNIN = { name: "SignIn" };
export const ROUTE_HOME = { name: "Home" };
export const ROUTE_SIGNUP = { name: "SignUp" };

const routes: Array<RouteRecordRaw> = [
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

export default router;
