<template>
  <div class="main-content">
    <section>
      <Home />
    </section>

    <section id="sobre">
      <About />
    </section>

    <section id="servicos">
      <h1>Serviços</h1>
      <p>Conteúdo da seção Serviços.</p>
    </section>

    <section id="contato">
      <h1>Contato</h1>
      <p>Conteúdo da seção Contato.</p>
    </section>
  </div>
</template>

<script setup>
import About from '../About/About.vue';
</script>

<style lang="scss">
.main-content {
  padding: 50px;
  margin: 20px 0;
  background-color: #f9f9f9;
}
</style>
