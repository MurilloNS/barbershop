<template>
  <header>
    <div class="wrapper">
      <Navbar />
    </div>
  </header>

  <RouterView />
  <MainContent />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import MainContent from "./views/MainContent/MainContent.vue";
import "./assets/styles.scss";
</script>

<style scoped></style>
