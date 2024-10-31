import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import DefaultLayout from "@/layouts/AuthLayout/AuthLayout.vue";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
      ],
    },
    {
      path: "/login",
      component: AuthLayout,
      children: [
        {
          path: "",
          name: "login",
          component: () => import("../views/Login/Login.vue"),
        },
      ],
    },
  ],
});

export default router;
