<script setup>
import Projects from "../data/Projects";
import { computed, provide } from "vue";
import { useRoute } from "vue-router";

import Hero from "../sections/Hero.vue";
import hero from "../assets/img/experience.jpg";
import { Icon } from "@iconify/vue";

import mdoIcon from "../assets/img/icons/mdo.png";
import ArchiveProjects from "../layouts/ProjectsLayout.vue";
import Footer from "../sections/Footer.vue";
import ProjectBrief from "../components/ProjectBrief.vue";

const route = useRoute();
const project = computed(() => Projects[route.params.slug]);
const Component = computed(() => project.value?.component);

if (project?.value?.title) {
  provide("slugLabel", project?.value?.title);
}
</script>

<template>
  <Hero
    :has-padding="true"
    :background-image="hero"
    :background-brightness="0.3"
    size="md"
  >
    <div class="grid grid-cols-2 gap-16">
      <!--left col-->
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

      <!--right col-->
      <div
        class="flex flex-col gap-4 p-4 rounded-lg shadow-xl h-fit"
        style="backdrop-filter: blur(10px)"
      >
        <ProjectBrief v-if="project" v-bind="project" />
      </div>
    </div>
  </Hero>
  <RouterView />
</template>
