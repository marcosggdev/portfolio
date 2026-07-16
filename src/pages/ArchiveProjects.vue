<script setup>
import Section from "../components/Section.vue";
import ProjectPreview from "../components/ProjectPreview.vue";

import portfolio from "../assets/img/portfolio.png";
import mdo from "../assets/img/mdo.png";
</script>

<template>
  <Section :has-padding="true" size="bg">
    <div class="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-16">
      <ProjectPreview
        :src="portfolio"
        icon="mdi:package-variant-closed"
        title="Portfolio"
        description="Por supuesto, esta página se incluye como proyecto"
        href="/proyectos/portfolio"
      >
      </ProjectPreview>
      <ProjectPreview
        :src="mdo"
        icon="mdi:package-variant-closed"
        title="Página de MDO Corp."
        description="La página oficial de MDO Corp. S. L."
        href="/proyectos/mdo-corp-sl"
      >
      </ProjectPreview>
      <ProjectPreview></ProjectPreview>
      <ProjectPreview></ProjectPreview>
      <ProjectPreview></ProjectPreview>
      <ProjectPreview></ProjectPreview>
    </div>
  </Section>
</template>
