<script setup>
import Section from "../components/Section.vue";
import ProjectPreview from "../components/ProjectPreview.vue";

import portfolio from "../assets/img/portfolio.png";
import mdo from "../assets/img/mdo.png";
import projects from "../data/Projects.js";
</script>

<template>
  <Section :has-padding="true" size="bg">
    <div
      class="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-8 md:gap-16"
    >
      <ProjectPreview
        v-for="project in projects"
        :src="project.src"
        :icon="project.icon"
        :title="project.title"
        :description="project.description"
        :href="project.href"
        :project-href="project.projectHref"
      />
      <ProjectPreview></ProjectPreview>
    </div>
  </Section>
</template>
