import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import DefaultLayout from "@/layouts/AuthLayout/AuthLayout.vue";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout.vue";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

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
    {
      path: "/dashboard",
      component: DashboardLayout,
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next("/login");
        } else {
          next();
        }
      },
      children: [
        {
          path: "agendamentos",
          name: "agendamentos",
          component: () => import("../views/Appointments/Appointments.vue"),
        },
        {
          path: "servicos",
          name: "servicos",
          component: () => import("../views/Services/Services.vue"),
        },
        {
          path: "perfil",
          name: "perfil",
          component: () => import("../views/Profile/Profile.vue"),
        },
      ],
    },
  ],
});

export default router;
