<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="../assets/images/logo.png" class="logo" alt="Logo" />
    </div>

    <ul class="navbar-links">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><a href="#servicos" @click="handleAnchorClick">Serviços</a></li>
      <li><RouterLink to="/loja">Loja</RouterLink></li>
      <li><a href="#sobre" @click="handleAnchorClick">Sobre</a></li>
      <li><a href="#contato" @click="handleAnchorClick">Contato</a></li>
    </ul>

    <div class="navbar-auth">
      <button class="auth-button">Entrar</button>
      <span class="auth-or">ou</span>
      <button class="auth-button">Registrar</button>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const handleAnchorClick = (event) => {
  if (route.path === "/loja") {
    event.preventDefault();
    const anchor = event.target.getAttribute("href");
    router.push(`/${anchor}`);
  }
};
</script>

<style lang="scss">
$navbar-bg: #1c1c1c;
$navbar-color: #f0e68c;
$hover-color: #d4c65a;
$button-bg: #f5b748;
$button-color: #1c1c1c;
$active-link-color: #ffd700;

.navbar {
  display: flex;
  align-items: center;
  background-color: $navbar-bg;
  color: $navbar-color;
  height: 70px;
  padding: 0 8em;
  gap: 10em;

  .navbar-logo {
    .logo {
      height: 80px;
      width: auto;
      padding-top: 0.5em;
    }
  }

  .navbar-links {
    list-style: none;
    display: flex;
    gap: 4em;
    margin: 0;
    padding: 0;

    li {
      cursor: pointer;

      a {
        color: $navbar-color;
        text-decoration: none;
        font-size: 1.2rem;
        transition: color 0.3s ease;

        &:hover {
          color: $hover-color;
        }
      }
    }
  }
}

.navbar-auth {
  display: flex;
  align-items: center;
  gap: 1em;

  .auth-button {
    background-color: $button-bg;
    color: $button-color;
    border: none;
    padding: 0.3em 0.8em;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 5%;

    &:hover {
      background-color: adjust-color($button-bg, $lightness: -10%);
    }
  }
}
</style>
