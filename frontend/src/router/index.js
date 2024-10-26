import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/sobre",
      name: "sobre",
      component: () => import("../views/About/About.vue"),
    },
  ],
});

export default router;
