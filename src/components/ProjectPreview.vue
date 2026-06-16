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
});
</script>

<template>
  <a class="flex flex-col gap-8" :href="href">
    <img class="aspect-square object-cover" :src="src" alt="" />
    <div class="grid grid-cols-[max-content_auto] gap-4 pb-32">
      <img class="e-bg-icon" :src="logo" alt="" />
      <div class="flex flex-col">
        <h2>{{ title }}</h2>

        <p>{{ description }}</p>
      </div>
    </div>
    <slot> </slot>
  </a>
</template>
