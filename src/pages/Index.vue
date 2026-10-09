<script setup>
import AboutMe from "../sections/AboutMe.vue";
import Hero from "../sections/Hero.vue";
import Welcome from "../sections/Welcome.vue";
import Projects from "../sections/Projects.vue";
import Button from "../components/Button.vue";

import hero from "../assets/img/ordenador.webp";
import Socials from "../components/Socials.vue";
import avatar from "../assets/img/avatar.jpg";
</script>

<template>
  <Hero
    :has-padding="true"
    :background-image="hero"
    :background-brightness="0.2"
    size="bg"
  >
    <div
      class="flex flex-col items-center md:items-start md:p-8 gap-16 md:grid md:grid-cols-[max-content_max-content] md:max-w-[1024px]"
    >
      <header class="flex flex-col gap-4">
        <img class="e-bg-icon rounded-full shadow-xl" :src="avatar" alt="" />
      </header>

      <div class="flex flex-col gap-10">
        <div class="flex flex-col">
          <h1 class="font-hero text-[var(--primary-color)]">Marcos G.</h1>
          <h3>Fullstack Developer</h3>
          <Socials class="pt-2" />
        </div>

        <div class="flex flex-col gap-4">
          <p class="max-w-[420px] text-[var(--light-text)]">
            Bienvenid@ a mi portfolio. Aquí podrás ver mi perfil profesional y
            leer sobre mis estudios y experiencia.
          </p>

          <div class="flex flex-row items-center gap-4">
            <Button
              type="link"
              href="/proyectos"
              variant="primary"
              background-color="var(--primary-color)"
              color="black"
            >
              Ver Proyectos
            </Button>

            <Button
              action="downloadCV"
              variant="secondary"
              :effects="['crystal']"
            >
              Descargar CV
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Hero>

  <Welcome />
  <AboutMe />
  <Projects />
</template>
