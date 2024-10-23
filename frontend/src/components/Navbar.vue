<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="../assets/images/logo.png" class="logo" alt="Logo" />
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss">
$navbar-bg: #262523;
$navbar-color: #fff;
$hover-color: #f5c67e;

.navbar {
  display: flex;
  align-items: center;
  background-color: $navbar-bg;
  color: $navbar-color;

  .navbar-logo {
    .logo {
      height: 30px;
      width: auto;
    }
  }
}
</style>
