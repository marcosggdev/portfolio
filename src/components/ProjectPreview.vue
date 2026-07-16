<script setup>
import { Icon } from "@iconify/vue";
import fallback from "../assets/img/fallback.png";

const props = defineProps({
  src: { type: String, default: fallback },
  logo: { type: String, default: fallback },
  title: { type: String, default: "Próximamente..." },
  description: {
    type: String,
    default:
      "Quédate pendiente y échale un vistazo a los nuevos proyectos que vendrán...",
  },
  href: { type: String, default: "#" },
  icon: { type: String, default: "mdi:clock-outline" },
});
</script>

<template>
  <a class="flex flex-col gap-8" :href="href">
    <img class="aspect-square object-cover" :src="src" alt="" />
    <div class="grid grid-cols-[max-content_auto] gap-4 pb-32">
      <Icon :icon="icon" class="e-bg-icon text-[var(--dark-text)]/60" />
      <div class="flex flex-col gap-2">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
    </div>
    <slot> </slot>
  </a>
</template>
