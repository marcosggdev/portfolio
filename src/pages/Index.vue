<script setup>
import AboutMe from "../sections/AboutMe.vue";
import Hero from "../sections/Hero.vue";
import Welcome from "../sections/Welcome.vue";
import Projects from "../sections/Projects.vue";
import Footer from "../sections/Footer.vue";
import Button from "../components/Button.vue";

import hero from "../assets/img/hero.jpg";
</script>

<template>
  <Hero
    :has-padding="true"
    :background-image="hero"
    :background-brightness="0.4"
    size="bg"
  >
    <div class="flex flex-col gap-8 max-w-[640px] items-center justify-center">
      <h2 class="text-center">
        Bienvenid@ a mi portfolio. Aquí podrás saber más sobre mí y sobre mis
        trabajos y experiencia
      </h2>
      <div class="flex flex-row items-center gap-4">
        <Button
          type="link"
          href="/proyectos"
          variant="secondary"
          :effects="['crystal']"
          >Ver Proyectos</Button
        >
        <Button variant="secondary" :effects="['crystal']">Descargar CV</Button>
      </div>
    </div>
  </Hero>
  <Welcome />
  <AboutMe />
  <Projects />
</template>
