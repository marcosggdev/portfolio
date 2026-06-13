<script setup>
import { Icon } from "@iconify/vue";
import avatar from "../assets/img/icons/avatar.png";
import Socials from "../components/Socials.vue";
</script>

<template>
  <footer
    class="flex flex-col min-h-[60vh] bg-[var(--light-bg)] text-[var(--light-title)]"
  >
    <div
      class="grid grid-cols-3 max-w-[1024px] ml-auto mr-auto w-full pl-16 pr-16 items-start flex-1 py-16 gap-10"
    >
      <!-- Columna 1 -->
      <div class="flex flex-col gap-4">
        <img class="e-bg-icon w-16 h-16" :src="avatar" alt="Avatar" />

        <div class="flex flex-col gap-2">
          <h3 class="text-[var(--dark-title)] text-lg font-semibold">
            Marcos G.
          </h3>

          <p class="text-[var(--dark-text)] text-sm leading-relaxed">
            Desarrollador web enfocado en crear experiencias modernas, rápidas y
            con personalidad.
          </p>

          <Socials color="text-black" />
        </div>
      </div>

      <!-- Columna 2 -->
      <div class="flex flex-col gap-4 text-sm">
        <h4 class="text-[var(--dark-title)] font-semibold">Navegación</h4>

        <a
          href="/"
          class="text-[var(--dark-text)] opacity-70 hover:opacity-100 transition"
        >
          Inicio
        </a>
        <a
          href="/proyectos"
          class="text-[var(--dark-text)] opacity-70 hover:opacity-100 transition"
        >
          Proyectos
        </a>
        <a
          href="/contacto"
          class="text-[var(--dark-text)] opacity-70 hover:opacity-100 transition"
        >
          Contacto
        </a>

        <div class="mt-4 flex flex-col gap-2">
          <h4 class="text-[var(--dark-title)] font-semibold">Legal</h4>

          <a
            href="/privacidad"
            class="text-[var(--dark-text)] opacity-70 hover:opacity-100 transition"
          >
            Privacidad
          </a>
          <a
            href="/cookies"
            class="text-[var(--dark-text)] opacity-70 hover:opacity-100 transition"
          >
            Cookies
          </a>
          <a
            href="/terminos-y-condiciones"
            class="text-[var(--dark-text)] opacity-70 hover:opacity-100 transition"
          >
            Términos
          </a>
        </div>
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
