import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../components/Cart/User/SignIn.vue";
import { UrlParameters } from "@/utilities/urlHandler";
import SignUp from "@/components/Cart/User/SignUp.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
