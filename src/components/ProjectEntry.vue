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
      <div class="flex flex-col gap-4 min-w-[640px]">
        <Breadcrumbs
          class="border-b-2 border-black/20 p-4"
          :theme="breadcrumbsThemeVariations[0]"
        />
        <h1>{{ title }}</h1>
        <h2>{{ subtitle }}</h2>
        <slot name="content"></slot>
      </div>
      <aside class="flex flex-col gap-4">
        <slot name="aside"></slot>
      </aside>
    </div>
  </Section>
</template>
