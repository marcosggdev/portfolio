<script setup>
import Section from "../components/Section.vue";
import ProjectPreview from "../components/ProjectPreview.vue";

import mdo from "../assets/img/mdo.png";
</script>

<template>
  <Section :has-padding="true" size="bg">
    <div class="grid grid-cols-3 gap-16">
      <ProjectPreview
        :src="mdo"
        title="Portfolio"
        description="Por supuesto, esta página se incluye como proyecto"
        href="/proyectos/mdo-corp-sl"
      >
      </ProjectPreview>
      <ProjectPreview></ProjectPreview>
      <ProjectPreview></ProjectPreview>
      <ProjectPreview></ProjectPreview>
      <ProjectPreview></ProjectPreview>
      <ProjectPreview></ProjectPreview>
    </div>
  </Section>
</template>
