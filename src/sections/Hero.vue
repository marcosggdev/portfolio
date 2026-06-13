<script setup>
import Section from "../components/Section.vue";
import Nav from "../components/Nav.vue";
import Button from "../components/Button.vue";

import hero from "../assets/img/hero.jpg";
</script>

<template>
  <Section
    class="text-white"
    :has-padding="false"
    :background-image="hero"
    :background-brightness="0.4"
  >
    <div
      class="flex flex-row gap-2 items-center justify-center w-full h-full absolute inset-0 w-full h-full"
    >
      <Nav class="fixed inset-0 w-full h-fit" />
      <div class="flex flex-col gap-8 max-w-[60%] items-center justify-center">
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
          <Button variant="secondary" :effects="['crystal']"
            >Descargar CV</Button
          >
        </div>
      </div>
    </div>
  </Section>
</template>
