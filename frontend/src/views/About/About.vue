<template>
  <div class="about">
    <div class="about-image">
      <img src="../../assets/images/place.jpg" class="place" alt="Barbearia" />
    </div>
    <div class="about-text">
      <h1>BEM VINDO A BARBERSHOP</h1>
      <p>
        A Barbershop é um espaço dedicado ao homem moderno que valoriza
        qualidade, estilo e momentos de descontração. Aqui, cuidamos de todos os
        detalhes para oferecer uma experiência completa: do corte de cabelo e
        barba aos serviços premium de estética masculina e relaxamento.
      </p>
      <p>
        Com um ambiente cuidadosamente projetado, clássico e exclusivamente
        masculino, proporcionamos o espaço ideal para relaxar, bater um papo, e
        aproveitar uma cerveja gelada ou uma partida de sinuca.
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  .about-image {
    img {
      width: 100%;
      max-width: 70%;
      height: 70%;
      border-radius: 10px;
    }
  }

  .about-text {
    font-size: 1rem;
    line-height: 1.6;
    text-align: center;
  }

  @media (max-width: 880px) {
    grid-template-columns: 1fr;

    .about-image,
    .about-text {
      padding: 10px;
      text-align: center;
    }
  }
}
</style>
