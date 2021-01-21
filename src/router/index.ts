import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: () => import("@/components/Cart/User/SignIn.vue")
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => import("@/components/Cart/User/SignUp.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
