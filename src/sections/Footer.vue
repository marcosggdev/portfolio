<script setup>
import { Icon } from "@iconify/vue";
import avatar from "../assets/img/avatar.jpg";
import Socials from "../components/Socials.vue";
import Navbar from "../components/Navbar.vue";

import { navbarThemeVariations } from "../theme/NavbarTheme";
</script>

<template>
  <footer
    class="flex flex-col min-h-[100vh] md:min-h-[60vh] bg-[var(--light-bg)] text-[var(--light-title)]"
  >
    <div
      class="flex flex-col md:grid md:grid-cols-3 md:max-w-[1024px] ml-auto mr-auto w-full pl-8 pr-8 md:pl-16 md:pr-16 items-start flex-1 py-16 gap-10"
    >
      <!-- Columna 1 -->
      <div class="flex flex-col gap-4">
        <img
          class="e-bg-icon w-16 h-16 rounded-full"
          :src="avatar"
          alt="Avatar"
        />

        <div class="flex flex-col gap-2">
          <h3 class="text-[var(--dark-title)] text-lg font-semibold">
            Marcos G.
          </h3>

          <p class="text-[var(--dark-text)] text-sm leading-relaxed">
            Desarrollador web enfocado en crear experiencias modernas, rápidas y
            con personalidad.
          </p>

          <Socials color-class="text-black" />
        </div>
      </div>

      <!-- Columna 2 -->
      <div class="flex flex-col gap-4 text-sm">
        <h4 class="text-[var(--dark-title)] font-semibold">Navegación</h4>

        <Navbar
          class="flex flex-col gap-2"
          group="main"
          v-bind="navbarThemeVariations[0]"
        />
      </div>

      <!-- Columna 3 -->
      <div class="flex flex-col gap-4 text-sm">
        <h4 class="text-[var(--dark-title)] font-semibold">Lo que hago</h4>

        <p class="text-[var(--dark-text)] leading-relaxed">
          Diseño y desarrollo interfaces web modernas con Vue / Nuxt, enfocadas
          en rendimiento, animaciones suaves y experiencia de usuario.
        </p>

        <div class="flex flex-col gap-2 mt-2 pl-4 text-[var(--dark-text)]">
          <span class="flex items-center gap-2">
            <Icon icon="mdi:lightning-bolt" class="sm-icon" />
            Rendimiento web
          </span>

          <span class="flex items-center gap-2">
            <Icon icon="mdi:palette" class="sm-icon" />
            Diseño UI / UX
          </span>

          <span class="flex items-center gap-2">
            <Icon icon="mdi:rocket-launch" class="sm-icon" />
            Animaciones con GSAP
          </span>
        </div>

        <div class="mt-4">
          <h4 class="text-[var(--dark-title)] font-semibold">Disponibilidad</h4>

          <p class="text-[var(--dark-text)]">
            Disponible para trabajos freelance, colaboraciones y oportunidades
            laborales.
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="text-black p-4 w-full flex flex-row items-center justify-between border-t border-black/10"
    >
      <small>© 2026 marcosggdev. Todos los derechos reservados.</small>

      <small class="opacity-60">
        Construido con Vue · Diseñado con enfoque técnico y claridad visual
      </small>
    </div>
  </footer>
</template>
