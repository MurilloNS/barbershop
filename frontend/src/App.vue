<template>
  <Navbar v-if="!(isRegisterRoute || isLoginRoute)" />
  <RouterView />
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import "./assets/styles.scss";
import Navbar from "./components/Navbar.vue";
import { ref, watch } from "vue";

const route = useRoute();
const isRegisterRoute = ref(false);
const isLoginRoute = ref(false);

watch(
  route,
  (newRoute) => {
    isRegisterRoute.value = newRoute.name === "register";
    isLoginRoute.value = newRoute.name === "login";
  },
  { immediate: true },
);
</script>

<style scoped></style>
