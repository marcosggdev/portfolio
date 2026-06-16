<script setup>
import Navbar from "./Navbar.vue";
import Section from "./Section.vue";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
});
</script>

<template>
  <Section :has-padding="true">
    <div class="grid grid-cols-[70%_auto] gap-16">
      <div class="flex flex-col gap-4 min-w-[640px]">
        <header
          class="flex flex-col gap-2 border-t-1 border-b-1 flex flex-row items-center gap-2 max-w-[50%]"
        >
          <RouterLink to="/proyectos">Proyectos</RouterLink>
          >
          <RouterLink tp="/proyectos/mdo-corp-sl">mdo-corp-sl</RouterLink>
        </header>
        <h1>{{ title }}</h1>
        <h2>{{ subtitle }}</h2>
        <slot></slot>
      </div>
      <aside class="flex flex-col gap-4">Aside</aside>
    </div>
  </Section>
</template>
