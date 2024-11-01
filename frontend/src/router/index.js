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
      path: "/register",
      component: AuthLayout,
      children: [
        {
          path: "",
          name: "register",
          component: () => import("../views/Register/Register.vue"),
        },
      ],
    },
  ],
});

export default router;
