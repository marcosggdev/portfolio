<script setup>
import Hero from "../sections/Hero.vue";
import hero from "../assets/img/experience.jpg";
import { Icon } from "@iconify/vue";

import mdoIcon from "../assets/img/icons/mdo.png";
import ArchiveProjects from "../sections/ArchiveProjects.vue";
</script>

<template>
  <Hero
    :has-padding="true"
    :background-image="hero"
    :background-brightness="0.3"
    size="md"
  >
    <div class="grid grid-cols-2 gap-16">
      <div class="flex flex-col gap-4 p-4 rounded-lg h-fit">
        <div class="grid grid-cols-[max-content_auto] gap-4 flex-1">
          <Icon class="e-bg-icon" icon="mdi:folder-outline" />
          <div class="flex flex-col gap-2">
            <div class="flex flex-col">
              <h2 class="text-[var(--light-title)]">Proyectos</h2>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-[var(--light-text)]">
                Aquí podrás acceder a todos mis proyectos publicados en mi
                Portfolio. Podrás visitar directamente algunos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col gap-4 p-4 rounded-lg shadow-xl h-fit"
        style="backdrop-filter: blur(10px)"
      >
        <div class="grid grid-cols-[max-content_auto] gap-4 flex-1">
          <img class="e-bg-icon object-cover" :src="mdoIcon" alt="" />
          <div class="flex flex-col gap-4">
            <div class="flex flex-col">
              <h4 class="text-[var(--light-title)]">Página de MDO Corp. SL</h4>
              <a
                class="text-[var(--light-title)]"
                href="https://mdo-corp.vercel.app"
                >mdo-corp.vercel.app</a
              >
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-[var(--light-text)]">
                Desarrollé con Nuxt + Vue la página oficial de la empresa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Hero>
  <ArchiveProjects />
</template>
