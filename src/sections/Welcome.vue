<script setup>
import Section from "../components/Section.vue";
import Socials from "../components/Socials.vue";

import logo from "../assets/img/icons/logo.png";
import avatar from "../assets/img/icons/avatar.png";
import academic from "../assets/img/svg/academic.svg";
import Button from "../components/Button.vue";
</script>

<template>
  <Section size="sm" class="flex flex-col bg-[#e6e6e6]">
    <div
      class="grid grid-cols-2 max-w-[1024px] ml-auto mr-auto w-full h-full isolate"
    >
      <img
        class="w-full object-cover -z-1"
        style="filter: drop-shadow(0 0 50px black)"
        :src="logo"
        alt=""
      />
      <div class="flex flex-col gap-4 p-16 bg-white">
        <div class="flex flex-col gap-8 justify-center relative">
          <header class="flex flex-col gap-4">
            <img class="e-bg-icon" :src="avatar" alt="" />
            <div class="flex flex-col">
              <h2>Marcos G.</h2>
              <Socials color="text-black" :expanded="true" />
            </div>
          </header>
          <main class="flex flex-col gap-8">
            <p>
              Me llamo Marcos G. y vivo en una zona rural Asturiana en el
              Concejo de Aller. Obtuve mi título de Técnico Superior en
              Desarrollo de Aplicaciones Web al terminar el CFGS DAW en el IES
              Bernaldo de Quirós, Mieres, y actualmente busco mi primer trabajo
              como desarrollador.
            </p>
            <div class="flex flex-row items-center gap-6">
              <Button background-color="black" color="white" variant="primary"
                >Ver Proyectos</Button
              >
              <Button color="black" variant="secondary">Descargar CV</Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  </Section>
</template>
