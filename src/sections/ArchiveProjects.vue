<script setup>
import Section from "../components/Section.vue";
import SingleProject from "./SingleProject.vue";
</script>

<template>
  <Section :has-padding="true" size="bg">
    <div class="grid grid-cols-3 gap-16">
      <SingleProject
        title="Portfolio"
        description="Por supuesto, esta página se incluye como proyecto"
      >
      </SingleProject>
      <SingleProject
        title="Portfolio"
        description="Por supuesto, esta página se incluye como proyecto"
      >
      </SingleProject>
      <SingleProject
        title="Portfolio"
        description="Por supuesto, esta página se incluye como proyecto"
      >
      </SingleProject>
      <SingleProject
        title="Portfolio"
        description="Por supuesto, esta página se incluye como proyecto"
      >
      </SingleProject>
      <SingleProject
        title="Portfolio"
        description="Por supuesto, esta página se incluye como proyecto"
      >
      </SingleProject>
    </div>
  </Section>
</template>
