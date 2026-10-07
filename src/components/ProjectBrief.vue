<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  src: { type: String, required: true },
  title: { type: String, required: true },
  domain: { type: String, required: true },
  href: { type: String, required: true },
  text: { type: String, required: true },
  description: { type: String, required: false },
  icon: { type: String, default: "mdi:package-variant-closed" },
});
</script>

<template>
  <div class="grid grid-cols-[max-content_auto] gap-4 flex-1">
    <img class="e-bg-icon object-cover" :src="src" alt="" />
    <div class="flex flex-col gap-4">
      <div class="flex flex-col">
        <h4 class="text-[var(--light-title)]">{{ title }}</h4>
        <a class="text-[var(--light-title)]" :href="href">{{ domain }}</a>
      </div>

      <!-- Descripción corta opcional -->
      <!--
      <p v-if="description" class="text-[var(--light-text)] text-sm">
        {{ description }}
      </p>
    -->

      <div class="flex flex-col gap-2">
        <p class="text-[var(--light-text)]">
          {{ text }}
        </p>
      </div>

      <!-- Icono opcional -->
      <div v-if="icon" class="flex items-center gap-2 mt-auto">
        <Icon :icon="icon" class="text-xl" />
        <span class="text-xs text-[var(--light-text)]/60">Proyecto</span>
      </div>
    </div>
  </div>
</template>
