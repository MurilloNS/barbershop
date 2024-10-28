<template>
  <div>
    <img src="../../assets/images/home-image.png" class="home-img" alt="Home" />
    <div class="overlay">
      <h1>
        Tenha o corte<br />
        a sua cara
      </h1>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.home-img {
  width: 100%;
  height: 55vh;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.overlay {
  position: absolute;
  top: 27%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

@media (max-width: 1057px) {
  .overlay {
    font-size: 2rem;
    line-height: 1.2;
  }
}

@media (max-width: 848px) {
  .overlay {
    font-size: 1.7rem;
    line-height: 1.3;
  }
}
</style>
