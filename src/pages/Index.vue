<script setup>
import AboutMe from "../sections/AboutMe.vue";
import Hero from "../sections/Hero.vue";
import Welcome from "../sections/Welcome.vue";
import Projects from "../sections/Projects.vue";
import Footer from "../sections/Footer.vue";
import Button from "../components/Button.vue";

import hero from "../assets/img/ordenador.jpg";
import InfoCard from "../components/InfoCard.vue";
import Socials from "../components/Socials.vue";
</script>

<template>
  <Hero
    :has-padding="true"
    :background-image="hero"
    :background-brightness="0.2"
    size="bg"
  >
    <div class="grid grid-cols-[max-content_max-content] gap-16 max-w-[1024px]">
      <header class="flex flex-col gap-4">
        <img class="e-bg-icon rounded-xl shadow-xl" :src="hero" alt="" />
        <div class="flex flex-col">
          <h2>Marcos G.</h2>
          <Socials />
        </div>
      </header>

      <div class="flex flex-col gap-4">
        <h1 class="font-hero text-[var(--primary-color)]">
          Fullstack Developer
        </h1>
        <div class="flex flex-col gap-8">
          <p class="max-w-[420px]">
            Bienvenid@ a mi portfolio. Aquí podrás saber más sobre mí y sobre mi
            experiencia profesional y formación.
          </p>

          <div class="flex flex-row items-center gap-4">
            <Button
              type="link"
              href="/proyectos"
              variant="secondary"
              :effects="['crystal']"
              >Ver Proyectos</Button
            >
            <Button variant="secondary" :effects="['crystal']"
              >Descargar CV</Button
            >
          </div>
        </div>
      </div>
    </div>
  </Hero>
  <Welcome />
  <AboutMe />
  <Projects />
</template>
