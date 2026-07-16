<script setup>
import Breadcrumbs from "./Breadcrumbs.vue";
import Navbar from "./Navbar.vue";
import Section from "./Section.vue";
import { breadcrumbsThemeVariations } from "../theme/Breadcrumbs";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
});
</script>

<template>
  <Section :has-padding="true">
    <div class="grid grid-cols-[70%_auto] gap-16">
      <div class="flex flex-col gap-16 min-w-[640px]">
        <Breadcrumbs class="p-4" :theme="breadcrumbsThemeVariations[0]" />
        <header class="flex flex-col gap-2">
          <h1 class="text-[var(--dark-title)]">{{ title }}</h1>
          <h2 class="text-[var(--dark-subtitle)]">{{ subtitle }}</h2>
        </header>
        <slot name="content"></slot>
      </div>
      <aside class="flex flex-col gap-4">
        <slot name="aside"></slot>
      </aside>
    </div>
  </Section>
</template>
