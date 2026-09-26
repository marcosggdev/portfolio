<script setup>
import { Icon } from "@iconify/vue";
import experience from "../assets/img/experience.jpg";
</script>

<template>
  <div
    class="flex flex-col md:grid md:grid-cols-2 items-center gap-16 h-screen p-4 md:p-8 pt-16 pb-16 md:pt-32 md:pb-32 max-w-[1024px] ml-auto mr-auto"
  >
    <div class="flex flex-col gap-8">
      <h3 class="text-[var(--primary-color)]">Experiencia</h3>
      <div class="flex flex-col gap-8 overflow-y-auto h-[70vh] md:h-[50vh]">
        <div class="grid grid-cols-[max-content_auto] gap-4">
          <div class="flex flex-col items-center gap-4">
            <Icon class="text-white bg-icon" icon="fa6-brands:wordpress" />
            <h5 class="text-[var(--primary-color)] !text-sm">3 Meses</h5>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <div class="flex flex-row gap-4 items-center">
                <h5 class="text-[var(--light-title)]">Prácticas FP</h5>
                <h5 class="text-[var(--light-text)]">2023</h5>
              </div>
              <p class="text-[var(--light-text)]">
                Realicé mis prácticas FP en una startup Ovetense, y aprendí a
                usar Wordpress: crear temas personalizados, hacer páginas con el
                editor, usar plugins...
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-[max-content_auto] gap-4">
          <div class="flex flex-col items-center gap-4">
            <Icon class="text-white bg-icon" icon="logos:nuxt-icon" />
            <h5 class="text-[var(--primary-color)] !text-sm">3 Meses</h5>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <div class="flex flex-row gap-4 items-center">
                <h5 class="text-[var(--light-title)]">
                  Proyecto MDO Corp. S. L.
                </h5>
                <h5 class="text-[var(--light-text)]">2025</h5>
              </div>
              <p class="text-[var(--light-text)]">
                Realicé la página de empresa de MDO Corp. S. L., empresa de la
                que formo parte como socio. El proyecto se realizó con Nuxt +
                Vue, principalmente.
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-[max-content_auto] gap-4">
          <div class="flex flex-col items-center gap-2">
            <Icon class="text-white bg-icon" icon="logos:c-plusplus" />
            <Icon class="text-white bg-icon" icon="devicon:opengl" />
            <Icon class="text-white bg-icon" icon="logos:discord-icon" />
            <h5 class="text-[var(--primary-color)] !text-sm">12 Meses</h5>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <div class="flex flex-row gap-4 items-center">
                <h5 class="text-[var(--light-title)]">Otros proyectos</h5>
                <h5 class="text-[var(--light-text)]">2026</h5>
              </div>
              <p class="text-[var(--light-text)]">
                En mi tiempo libre desarrollo otros proyectos personales, no
                necesariamente en el ámbito web. Algunos ejemplos: videojuego
                web 2D con WebGL, Bots para Discord con discord.js, etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img class="w-full h-full object-cover" :src="experience" alt="" />
  </div>
</template>
